#include <Keypad.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

#define ROW_NUM     4 // four rows
#define COLUMN_NUM  3 // three columns
#define BUTTON_PIN 36
#define LED_PIN 2

const char* ssid = "FerPhone";
const char* password = "69696969";
const char* serverName = "http://hybike.herokuapp.com/station";
const char* serverAccept = "http://hybike.herokuapp.com/station/accept";

char keys[ROW_NUM][COLUMN_NUM] = {
  {'1', '2', '3'},
  {'4', '5', '6'},
  {'7', '8', '9'},
  {'*', '0', '#'}
};

byte pin_rows[ROW_NUM] = {18, 5, 17, 16}; // GIOP18, GIOP5, GIOP17, GIOP16 connect to the row pins
byte pin_column[COLUMN_NUM] = {4, 0, 2};  // GIOP4, GIOP0, GIOP2 connect to the column pins

unsigned long pingLoop = 0;
unsigned long pingDelay = 3000;
bool isRequesting = false;

Keypad keypad = Keypad( makeKeymap(keys), pin_rows, pin_column, ROW_NUM, COLUMN_NUM );

void setup() {
  Serial.begin(115200);
  pinMode(BUTTON_PIN,INPUT_PULLUP);
  pinMode(LED_PIN,OUTPUT);
  WiFi.begin(ssid, password);
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  int buttonState = digitalRead(BUTTON_PIN);
  if ((buttonState == HIGH) && (isRequesting == true)) {
    WiFiClient client;
    HTTPClient http;

    http.begin(client,serverAccept);
    http.addHeader("Content-Type","application/json");
    String httpRequestData =  "{\"stationId\":\"1\"}";
    int httpResponseCode = http.POST(httpRequestData);

    if (httpResponseCode == 200){
      digitalWrite(LED_PIN,LOW);
      isRequesting = false;
    }
  }
  
  char key = keypad.getKey();

  if (key) {
    Serial.println(key);
  }

  if (millis() - pingLoop > pingDelay){
    if(WiFi.status()== WL_CONNECTED){
      if (isRequesting == false){
        WiFiClient client;
        HTTPClient http;
      
        // Your Domain name with URL path or IP address with path
        http.begin(client, serverName);
        
        // If you need Node-RED/server authentication, insert user and password below
        //http.setAuthorization("REPLACE_WITH_SERVER_USERNAME", "REPLACE_WITH_SERVER_PASSWORD");
        
        http.addHeader("Content-Type", "application/json");
        String httpRequestData = "{\"stationId\":\"1\"}";
        int httpResponseCode = http.POST(httpRequestData);
  
        if (httpResponseCode == 200 && isRequesting == false){
          String jsonResponse = http.getString();
          StaticJsonDocument<200> doc;
          DeserializationError error = deserializeJson(doc,jsonResponse);
          if (error) {
          Serial.print("Failed to parse JSON: ");
          Serial.println(error.c_str());
          } else{
  //            const char* resType = doc["type"];
              const char* user = doc["message"];
              Serial.println(user);
            if (doc["type"] == "request"){
              isRequesting = true;
              digitalWrite(LED_PIN,HIGH);
            }
          }
          http.end();
        }   
      }else{
        Serial.println("This station is being used.");
      }
      
    }else{
      Serial.println("WiFi Disconnected");
    }
    pingLoop += pingDelay;
  }
}
