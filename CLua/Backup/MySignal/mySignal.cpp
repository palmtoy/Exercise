#include<unistd.h>
#include<signal.h>
#include<stdio.h>

void handler(int _) {
	printf("hello\n");
}

main()
{
	signal(SIGALRM, handler);
	alarm(3);
	for(int i = 1; i <= 9; i++){
		printf("sleep %d ...\n", i);
		sleep(1);
	}
}

