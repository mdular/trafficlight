#include <SoftwareSerial.h>

#define STATE_RED "0"
#define STATE_ORANGE "1"
#define STATE_GREEN "2"
#define STATE_YELLOW "3"

#define STATES_COUNT 4

#define CONTROL_PIN 3
#define POWER_PIN 2

#define DELIMITING_CYCLES 1000

#define SW_TX_PIN 7
#define SW_RX_PIN 8

int state = 0;

SoftwareSerial BTSerial(SW_RX_PIN, SW_TX_PIN); // RX, TX

void setup() {
  Serial.begin(9600);
  pinMode(CONTROL_PIN, OUTPUT);

  // power on the traffic light
  pinMode(POWER_PIN, OUTPUT);
  digitalWrite(POWER_PIN, HIGH);

  BTSerial.begin(9600);
}

String val = "";
int lastInput = 0;
//unsigned long time = 0;

void loop() {
  
  while (BTSerial.available()) {
    int incomingByte = BTSerial.read();

    // delimit if terminated by line feed, otherwise reset
    if (incomingByte == '\n') {
      lastInput = DELIMITING_CYCLES + 1;
    } else {
      lastInput = 0;
      
      val += char(incomingByte);
    }
  }

  if (!BTSerial.available() && val != "" && lastInput > DELIMITING_CYCLES) {
    Serial.println(val);
    BTSerial.println(val);

    int targetState = val.toInt();
    if (targetState >= 0 && targetState <= 3) {
      set(targetState);
    } else if (targetState == 4) {
      digitalWrite(POWER_PIN, LOW);
    } else if (targetState == 5) {
      digitalWrite(POWER_PIN, HIGH);
    } else {
      digitalWrite(CONTROL_PIN, LOW);
    }
    
    val = "";
  }

  lastInput++;


  while (Serial.available()) {
    int incomingByte = Serial.read();
    BTSerial.write(incomingByte);
  }
}

void set(int target)
{
//  if (target == state) {
//    return;
//  }

  int pushes = (target - state + STATES_COUNT) % STATES_COUNT;

  if (state == target) {
    pushes = STATES_COUNT;
  }

  for (int i = 0; i < pushes; i++) {
    digitalWrite(CONTROL_PIN, HIGH);
    delay(20);
    digitalWrite(CONTROL_PIN, LOW);
    delay(20);
  }
  
  state = target;
}

