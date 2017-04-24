//  Code for SPOTS Hardware :D
//  Dedicated Hardware Pins for the ESP8266 can be seen here:
//     http://esp8266.github.io/Arduino/versions/2.0.0/doc/reference.html#digital-io 
//
//  NFC Reader Pins
//  SDA    4
//  SCK    14
//  MOSI   13
//  MISO   12
//  IRQ    -
//  RST    5

#include <ESP8266WiFi.h>
#include <SPI.h>
#include <MFRC522.h>      // Library Downloaded from: https://github.com/miguelbalboa/rfid
#include "RestClient.h"   // Library Downloaded from: https://github.com/DaKaZ/esp8266-restclient

#define apiKey  "1234"    //  Key for interacting with server
#define lotID  "NV"    //  The hardware's current lotID, must be changed for each post...
#define spotID  "NV010"  //  The lot number the hardware is set up at, must be changed for each post...

// These two fields must be changed if a different access point is used.
#define weefee_ID       "stuff"
#define weefee_Password "stuffy"

#define Green_Led   15
#define Red_Led     0
#define Sensor_Pin  16

// The items that in the following section are all used with the rfid reader
#define RESET_PIN     5
#define SELECTOR_PIN  4

MFRC522 mfrc522(SELECTOR_PIN, RESET_PIN);
MFRC522::MIFARE_Key key;

unsigned int UID = 0;
unsigned long start_time = 0;
unsigned long current_time = 0;
unsigned long timer = 0;
unsigned int timeLimit = 20000;  // Time in milliseconds for sign in

RestClient client = RestClient("6cb06ef3.ngrok.io");
String response;
String path;

bool cardPresent = false;
bool authorized = false;
bool flag;

// List of all the beautiful functions used for this immaculate device
void Wifi_connect();    // Setup code to connect the ESP8266 to the wifi_chip
void get_UID();         // Function to read the data UID from a card
void flash_LED();
bool readCard();        // Convenience Function to read a card
bool cheatAuthorization();  // Cheat function for testing until API is done
bool checkAuthorization();  // Check if the user is authorized
String createPath(String);  // Creates the path for rest calls
bool updateVacancy(bool);    // Update the server of a spot vacancy

void setup() {
  pinMode(Sensor_Pin, INPUT);
  pinMode(Green_Led, OUTPUT);
  pinMode(Red_Led, OUTPUT);
  Serial.begin(9600);
  Wifi_connect();
  SPI.begin();
  // Setup the RFID sensor  
  mfrc522.PCD_Init();           // Initialize the MFRC522 (rfid card)
  // Prepare key - all keys are set to FFFFFFFFFFFFh at chip delivery from the factory.
  for (byte i = 0; i < 6; i++) {
    key.keyByte[i] = 0xFF;    
  }
  
  // Setup the pins for LED 
  pinMode(Green_Led, OUTPUT);
  pinMode(Red_Led, OUTPUT);
  pinMode(Sensor_Pin, INPUT);
  digitalWrite(Green_Led, HIGH);
  digitalWrite(Red_Led, LOW);
}

void loop() {
  UID = 0;
  timer = 0;
  digitalWrite(Green_Led, HIGH);
  digitalWrite(Red_Led, LOW);
  authorized = false;
  start_time = millis();
  flag = false;
  
  while(!digitalRead(Sensor_Pin)){
    flag = true;
    Serial.print("Updating spot vacancy to false...");
    Serial.println();
    while(!updateVacancy(false)) {
      delay(100); // Continuously attempt to update Vacancy if the call fails....
      start_time = millis();
    }
    Serial.print("Pwease Scan an ID Card (^.^)\n");
    while( !digitalRead(Sensor_Pin) && readCard() && timer < timeLimit) {
      delay(50);
      timer = millis() - start_time;
      if(timer > 3000){ // 3 seconds to turn on Red LED
        digitalWrite(Red_Led, HIGH);
        digitalWrite(Green_Led, LOW);
      }
    }
    // If the object left exit the loop
    if(digitalRead(Sensor_Pin))
      break;
      
    if(timer > 3000){ // 3 seconds to turn on Red LED
        digitalWrite(Red_Led, HIGH);
        digitalWrite(Green_Led, LOW);
      }    
    // If the user timed out
    if(timer > timeLimit) {
      Serial.print("Uh Oh darling, you ran out of time =(\n");
      // ****************************************************************
      //  Just so it can easily be seen...
      //  Update database of timeOut
      // ****************************************************************
      // Kind of an odd workaround...
      // Logic here is that they either didn't scan a card... or took too long
      // Thus we send an authorization request with a UID that is guaranteed to not
      // be valid, this updates the server of an invalid parking at that spot...
      // At least... that's my thought process...
//      UID = 0;
//      authorized = checkAuthorization();
//    ****** Note.... I'm not even sure this is needed... I highly doubt it but eh...
      
      bool flash = true;
      while(!digitalRead(Sensor_Pin) && readCard()) 
      {
        digitalWrite(Red_Led, flash);
        flash = !flash;
        delay(250);   // Delay 250ms
      }
      // If the object left exit the loop
      if(digitalRead(Sensor_Pin))
        break;               
    }
    get_UID();
    // ****************************************************************
    //  Just so it can easily be seen...
    // Send UID to database to see if card is authorized
    // ****************************************************************

    //authorized = checkAuthorization();
    authorized = cheatAuthorization2();

    if(authorized) {
      Serial.print("Maaa!!!!! I did it!!! (Authorized user) \n");
      digitalWrite(Red_Led, LOW); // Shutoff Red LED for flashing sequence
      flash_LED(Green_Led, 2000); // Flash LED for 2 seconds
      digitalWrite(Green_Led, LOW); // Shutoff Green LED
      digitalWrite(Red_Led, HIGH);  // Turn on RED LED to signal occupied
      Serial.print("Time to wait for Michael to move his car...\n");
      while(!digitalRead(Sensor_Pin))
      {
        delay(500); // check the pin every 500ms to avoid WDT reset
      }
    }
    else // If they are not authorized...
    {
      Serial.print("Don't tell Maaa!!!! (Unauthorized user) \n");
      bool flash = true;
      while(!digitalRead(Sensor_Pin)) 
      {
        digitalWrite(Red_Led, flash);
        flash = !flash;
        delay(250);
      }
    }
  }
  if(flag == true) {
    Serial.print("Guess they left... (Object no longer detected)\n");
    Serial.print("Updating spot vacancy to true...");
    Serial.println();
    while(!updateVacancy(true)) {
      delay(100);
    }
    delay(500);  // Delay for 1/2 Second
  }
  delay(250); // Check for card every 250ms to avoid WDT resets
}

////////////////////////////////////////////////////////////////////////////////////////////////
/////////////           Functions used for Program are Below =]         ////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

// Connects the ESP8266 to a WiFi Network
// If unable to connect, check the weefee_ID and weefee_Password fields
//
void Wifi_connect()
{
  // Code to setup esp8266 to connect to zee weefee 
  delay(100);
  WiFi.begin(weefee_ID, weefee_Password);
  Serial.print("Connecting to ze network...");
  while (WiFi.status() != WL_CONNECTED) {
    //Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("connected: ");
  Serial.println(WiFi.localIP());
}

// Reads the Unique ID from the card and stores it as a 32-bit unsigned integer
void get_UID()
{
  for (byte i = 0; i < mfrc522.uid.size; i++) {
    UID = UID << 8;
    UID = UID + mfrc522.uid.uidByte[i];
  }
  // This information is printed to serial monitor for debug purposes
  Serial.print("Saved UID (DEC): ");
  Serial.print(UID, DEC);
  Serial.println();
  Serial.print("Saved UID (HEX): ");
  Serial.print(UID, HEX);
  Serial.println(); 
}

// Flashes a designated LED for a specified duration, the LED will always remain
// off at the end of the flashing sequence
// int LED - the pin number of the LED
// int duration - the amount of time to flash in milliseconds
void flash_LED(int LED, int duration)
{
  int initTime = millis();
  bool flash = true;
  while((millis() - initTime) <= duration )
  {
    // Flash with a period of 500ms
    flash = !flash;
    digitalWrite(LED, flash);
    delay(250);
  }
  digitalWrite(LED, LOW);
}

// Returns true if no card is being read, false otherwise
bool readCard() {
  return ( (!mfrc522.PICC_IsNewCardPresent() || !mfrc522.PICC_ReadCardSerial()) );
}

// Cheating test function that tests authorization of current card
bool cheatAuthorization() {
  if(UID == 0x647B403B)
    return true;
  else
    return false;
}

bool cheatAuthorization2() {
  Serial.print("Attempting to cheat Authorization...\n");
  if(UID == 0x647B403B){
    UID = 12345678; // This is a staff ID#
    Serial.print("Authorization should be set to True\n");
    return (checkAuthorization());
  }
  else {
    Serial.print("Authorization should be set to False\n");
    return false;
  }
}

// Generates a path to be used for the post and get API commands
// The command field should either be the string "swipe" or "update"
// A string containing the path to be updated is returned...
// Returned string looks like the following
// "/command/key/lotID/spotID/"
String createPath(String command)
{
  String tempPath;
  String spotsHW = "/spotsHW";
  tempPath =  spotsHW + '/' + command + '/' + apiKey + '/' + lotID + '/' + spotID + '/';
//  Serial.print("Generated path: ");
//  Serial.print(tempPath);
//  Serial.println();
//  delay(100);
  return tempPath;
}

// Updates the vacancy of the spot with the server
// If the spot is not occupied, set vacant = true;
// else, set it to false
bool updateVacancy(bool vacant)
{
  String updatePath = createPath("update");
  const char * c;
  int statusCode;
  response = "";
  
  if(vacant) {
    updatePath = updatePath + "true";
  }
  else {
    updatePath = updatePath + "false";
  }

  c = updatePath.c_str();
  Serial.print("Generated path: ");
  Serial.print(c);
  Serial.println();
  delay(10);
  // This is done in this way because client.post requires a const char* for the path...
  // client.post(const char* path, const char* body, String* response)
  statusCode = client.post(c, "POSTDATA", &response);
  Serial.print("Status code from server: ");
  Serial.println(statusCode);
  Serial.print("Response body from server: ");
  Serial.println(response);
  delay(10);
  if(statusCode == 200) // Status Code 200 means "OK"
    return true;
  else
    return false;
}

// Checks the whether the user was authorized
// Returns true if the user is authorized,
// false otherwise.
bool checkAuthorization()
{
  String swipePath = createPath("swipe");
  // UID is a global variable that contains the integer representation of the card ID
  String cardID = String(UID);
  swipePath = swipePath + cardID;
  const char * c;
  int statusCode;
  int len;
  
  c = swipePath.c_str();
  Serial.print("swipePath: ");
  Serial.print(c);
  Serial.println();
  statusCode = client.post(c, "POSTDATA", &response);
  Serial.print("Status code from server: ");
  Serial.println(statusCode);
  Serial.print("Response body from server: ");
  Serial.println(response); 
  delay(10);

  // Search the response string for "true" to see if user is authorized
  len = response.length();
  for(int i = 0; i <= len; i++) {
    if(response.substring(i, i + 4) == "true")
      return true;
  }
  // if we can't find "true" in the response string, user is not authorized...
  return false;
}
