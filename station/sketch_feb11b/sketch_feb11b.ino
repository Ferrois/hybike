#include <Keypad.h>
#include <WiFi.h>
#include <HTTPClient.h>

#define ROW_NUM     4 // four rows
#define COLUMN_NUM  3 // three columns

const char* ssid = "FerPhone";
const char* password = "69696969";
const char* serverName = "https://hybike.herokuapp.com/station";

char keys[ROW_NUM][COLUMN_NUM] = {
  {'1', '2', '3'},
  {'4', '5', '6'},
  {'7', '8', '9'},
  {'*', '0', '#'}
};

byte pin_rows[ROW_NUM] = {18, 5, 17, 16}; // GIOP18, GIOP5, GIOP17, GIOP16 connect to the row pins
byte pin_column[COLUMN_NUM] = {4, 0, 2};  // GIOP4, GIOP0, GIOP2 connect to the column pins

unsigned long pingLoop = 0;
unsigned long pingDelay = 2500;

Keypad keypad = Keypad( makeKeymap(keys), pin_rows, pin_column, ROW_NUM, COLUMN_NUM );

void setup() {
  Serial.begin(115200);
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
  char key = keypad.getKey();

  if (key) {
    Serial.println(key);
  }

  if (millis() - pingLoop > pingDelay){
    if(WiFi.status()== WL_CONNECTED){
      WiFiClient client;
      HTTPClient http;
    
      // Your Domain name with URL path or IP address with path
      http.begin(client, serverName);
      
      // If you need Node-RED/server authentication, insert user and password below
      //http.setAuthorization("REPLACE_WITH_SERVER_USERNAME", "REPLACE_WITH_SERVER_PASSWORD");
      
//      http.addHeader("Content-Type", "application/x-www-form-urlencoded");
      String httpRequestData = "test";           
      int httpResponseCode = http.POST(httpRequestData);

      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
      http.end();
    }else{
      Serial.println("WiFi Disconnected");
    }
  }
}
