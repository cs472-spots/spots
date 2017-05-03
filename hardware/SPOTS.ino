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
#include <MFRC522.h>        // Library Downloaded from: https://github.com/miguelbalboa/rfid
#include "RestClient.h"   // Library Downloaded from: https://github.com/DaKaZ/esp8266-restclient 

// These two fields must be changed if a different access point is used.
#define weefee_ID       "ChangeME"
#define weefee_Password "ChangeMETOO"

#define Green_Led   15
#define Red_Led     0
#define Sensor_Pin  16

// The items that in the following section are all used with the rfid reader
#define RESET_PIN     5
#define SELECTOR_PIN  4

MFRC522 mfrc522(SELECTOR_PIN, RESET_PIN);
MFRC522::MIFARE_Key key;
//////////////////

unsigned int UID = 0;
unsigned long start_time = 0;
unsigned long timer = 0;
unsigned int timeLimit = 20000;  // Time in milliseconds for sign in
unsigned int success = 0;
unsigned int failure = 0;

// URL for server communications must be added here
RestClient client = RestClient("unlv-spots.herokuapp.com");

bool vacancyFlag;
bool authorized;

// List of all the beautiful functions used for this immaculate device
void Wifi_connect();    // Setup code to connect the ESP8266 to the wifi_chip
void get_UID();         // Function to read the data UID from a card
void flash_LED();
bool readCard();        // Convenience Function to read a card
bool checkAuthorization();  // Check if the user is authorized
String createPath(String);  // Creates the path for rest calls
bool updateVacancy(String);    // Update the server of a spot vacancy

void setup() {
  Serial.begin(9600);
  Wifi_connect();
  SPI.begin(); 
  mfrc522.PCD_Init();
  // Prepare key - all keys are set to FFFFFFFFFFFFh at chip delivery from the factory.
  for (byte i = 0; i < 6; i++) {
    key.keyByte[i] = 0xFF;    
  }
   
  pinMode(Green_Led, OUTPUT);
  pinMode(Red_Led, OUTPUT);
  pinMode(Sensor_Pin, INPUT);
  Serial.println("Welcome to SPOTS!");
  Serial.println("Setting the lot to vacant as part of boot sequence...");
  updateVacancy("true"); // Set the vacancy of the spot to true at startup
  Serial.println("Waiting for spot to become occupied...");
}

void loop() {
  UID = 0;
  timer = 0;
  digitalWrite(Green_Led, HIGH);
  digitalWrite(Red_Led, LOW);
  start_time = millis();
  vacancyFlag = false;
  authorized = false;
  
  while(!digitalRead(Sensor_Pin)){
    while(millis() - start_time < 3000) { // Wait three seconds to ensure object is still present
      delay(100);
    }
    if(digitalRead(Sensor_Pin)){
      break;
    }
    digitalWrite(Red_Led, HIGH);
    digitalWrite(Green_Led, LOW);
    vacancyFlag = true;
    Serial.println("Vehicle Detected: Updating spot vacancy to false.");    
    updateVacancy("false");     
    start_time = millis();
    
    Serial.println("Please Scan an ID Card.");
    while( !digitalRead(Sensor_Pin) && readCard() && timer < timeLimit) {
      delay(50);
      timer = millis() - start_time;
    }
    // If the object left exit the loop
    if(digitalRead(Sensor_Pin))
      break;

    // If the user timed out
    if(timer > timeLimit) {
      Serial.print("User time has expired...\n");
      Serial.println("Alerting parking enforcement of unauthorized vehicle.");
      Serial.println("Please scan a card or leave the spot.");
      
      bool flash = true;
      while(!digitalRead(Sensor_Pin) && readCard()) 
      {
        digitalWrite(Red_Led, flash);
        flash = !flash;
        delay(250);   // Delay 250ms
      }
      digitalWrite(Red_Led, HIGH);
      // If the object, left exit the loop
      if(digitalRead(Sensor_Pin))
        break;               
    }
    get_UID();
    authorized = checkAuthorization();

    if(authorized == false)
    {
      bool flash = true; 
      while(authorized == false)
      {
        Serial.println("Please try scanning again or Please leave the spot.");
        while(!digitalRead(Sensor_Pin) && readCard())
        {
          digitalWrite(Red_Led, flash);
          flash = !flash;
          delay(250);
        }
        digitalWrite(Red_Led, HIGH);
        // If the object, left exit the loop
        if(digitalRead(Sensor_Pin))
          break;
        get_UID();
        authorized = checkAuthorization();   
//        delay(200);
//        break;
      }
    }
    if(authorized == true) {
      digitalWrite(Red_Led, LOW); // Shutoff Red LED for flashing sequence
      flash_LED(Green_Led, 2000); // Flash LED for 2 seconds
      digitalWrite(Red_Led, HIGH);  // Turn on RED LED to signal occupied
      Serial.print("Waiting for user to move their vehicle...\n");
      while(!digitalRead(Sensor_Pin))
      {
        delay(500); // check the pin every 500ms to avoid WDT reset
      }     
//      delay(200);
//      break; 
    }
  
  }
  if(vacancyFlag == true) {
    Serial.println("User has left the spot. Updating spot vacancy.");
    updateVacancy("true");
    Serial.println();
    Serial.println("Waiting for spot to become occupied...");
  }
  delay(100); // Check for card every 100ms to avoid WDT resets
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
  Serial.print("Connecting to the wifi network...");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }
  Serial.println();
  Serial.println("connected. ");
  //Serial.println(WiFi.localIP());
  delay(2000);  // Wait 2 seconds to stabilize connection...
}

// Reads the Unique ID from the card and stores it as a 32-bit unsigned integer
void get_UID()
{
  for (byte i = 0; i < mfrc522.uid.size; i++) {
    UID = UID << 8;
    UID = UID + mfrc522.uid.uidByte[i];
  }
  Serial.print("User has scanned a card with ID: ");
  Serial.println(UID);
  return;
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

// Updates the vacancy of the spot with the server
// If the spot is not occupied, set vacant = true;
// else, set it to false
bool updateVacancy(String vacant)
{
  String updatePath = "/spotsHW/update/1234/LB/0013/";
  const char * c;
  String response = "";
  int statusCode = 0;

  updatePath += vacant;
  c = updatePath.c_str();
  statusCode = client.post(c, "POSTDATA", &response);

  if(statusCode == 200) {
    success++;
  }
  else {
    failure++;
  }
  Serial.print("Successful requests: ");
  Serial.println(success);
  Serial.print("Failed requests:");
  Serial.println(failure);
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
  Serial.print("Checking for authorization of cardID: ");
  Serial.println(UID);
  String swipePath = "/spotsHW/swipe/1234/LB/0013/";
  // UID is a global variable that contains the integer representation of the card ID
  String cardID = String(UID);
  swipePath += cardID;
  const char * c;
  int statusCode = 0;
  int len;
  String response = "";
  
  c = swipePath.c_str();

  statusCode = client.post(c, "POSTDATA", &response);  

  if(statusCode == 200) {
    success++;
  }
  else {
    failure++;
  }
  Serial.print("Successful server requests: ");
  Serial.println(success);
  Serial.print("Failed requests:");
  Serial.println(failure);

  // Search the response string for "true" to see if user is authorized
  len = response.length();
  for(int i = 0; i <= len; i++) {
    if(response.substring(i, i + 4) == "true") {
      Serial.print("User is authorized. \n");
      return true;
    }
  }
  // if we can't find "true" in the response string, user is not authorized...
  Serial.print("User is unauthorized. \n");
  return false;
}
