#include<unistd.h>
#include<signal.h>
#include<sys/types.h>
#include<sys/wait.h>
#include <stdio.h>

main()
{
	pid_t pid;
	if(!(pid = fork())){
		printf("Hi I am child process!\n");
		sleep(30);
		return 0;
	}
	else{
		printf("send signal to child process (%d) \n", pid);
		sleep(3);
		// kill(pid, SIGABRT);
		kill(pid, SIGKILL);
		int status;
		wait(&status);
		if(WIFSIGNALED(status))
			printf("chile process receive signal %d\n", WTERMSIG(status));
	}
}

