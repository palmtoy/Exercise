#include <wiringPi.h>
#include <stdio.h>

int LED = 31; // GPIO_1 ~ PIN_28 ~ wPi_31

int main(int argc, char *argv[])
{
  printf("func:_main ( argc = %d ) is running ...\n", argc);
	wiringPiSetup();	/* initialize wiringPi setup */
	pinMode(LED, OUTPUT);	/* set GPIO as output */

	while (1) {
		digitalWrite(LED, HIGH);		/* write high on GPIO */
		delay(1000);
		digitalWrite(LED, LOW);		/* write low on GPIO */
		delay(1000);
	}

	return 0;
}

// gcc -o led_blink.out led_blink.c -l wiringPi

