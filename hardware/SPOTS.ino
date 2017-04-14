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

// These two fields must be changed if a different access point is used.
#define weefee_ID       "Nexus 5"
#define weefee_Password "tatertime"

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
unsigned int timeLimit = 300000;  // Time in milliseconds for sign in
String response;
bool cardPresent = false;
bool authorized = false;

// List of all the beautiful functions used for this immaculate device
void Wifi_connect();  // Setup code to connect the ESP8266 to the wifi_chip
void get_UID();     // Function to read the data UID from a card
void flash_LED();
bool readCard();    // Convenience Function to read a card

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
  start_time = millis();
  
  while(digitalRead(Sensor_Pin)){ 
    // ****************************************************************
    //  Just so it can easily be seen...
    //  Update database of occupancy
    // ****************************************************************  
    Serial.print("Pwease Scan an ID Card (^.^)\n");
    while( (digitalRead(Sensor_Pin)) && (readCard() || timer < timeLimit)) {
      delay(50);
      timer = start_time - millis();
    }
    // If the object left
    if(!digitalRead(Sensor_Pin))
      break;
    // If the user timed out
    if(timer > timeLimit) {
      Serial.print("Uh Oh darling, you ran out of time =(\n");
      // ****************************************************************
      //  Just so it can easily be seen...
      //  Update database of timeOut
      // ****************************************************************
      bool flash = true;
      while(digitalRead(Sensor_Pin) || readCard()) 
      {
        digitalWrite(Red_Led, flash);
        flash = !flash;
        delay(250);   // Delay 250ms
      }         
    }
    get_UID();
    // ****************************************************************
    //  Just so it can easily be seen...
    // Send UID to database to see if card is authorized
    // ****************************************************************
    if(authorized) {
      Serial.print("Maaa!!!!! I did it!!! (Authorized user) \n");
      flash_LED(Green_Led, 120000); // Flash LED for 2 seconds
      digitalWrite(Green_Led, LOW); // Shutoff Green LED
      digitalWrite(Red_Led, HIGH);  // Turn on RED LED to signal occupied
    }
    else // If they are not authorized...
    {
      Serial.print("Don't tell Maaa!!!! (Unauthorized user) \n");
      bool flash = true;
      while(digitalRead(Sensor_Pin)) 
      {
        digitalWrite(Red_Led, flash);
        flash = !flash;
      }
    }
  }
  Serial.print("Guess they left... (Object no longer detected)\n");
  // ****************************************************************
  //  Just so it can easily be seen...
  // Update Database of vacancy
  // ****************************************************************
  delay(1000);  // Delay for 1 Second
}

////////////////////////////////////////////////////////////////////////////////////////////////
/////////////           Functions used for Program are Below =]         ////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

// Connects the ESP8266 to a WiFi Network
// If unable to connect, check the weefee_ID and weefee_Password fields
//
void Wifi_connect()
{
  Serial.print(F("Card UID: "));
  // Code to setup esp8266 to connect to zee weefee 
  WiFi.begin(weefee_ID, weefee_Password);
  Serial.print("Connecting to ze network");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
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

// Returns true if the read was successful, false otherwise.
bool readCard() {
  return ( (!mfrc522.PICC_IsNewCardPresent() || !mfrc522.PICC_ReadCardSerial()) );
}

