/* atoi example */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main ()
{
	char strServerId[] = "lzg@888:1";
	char* s_server_id = strchr(strServerId, '@');
	*s_server_id = '_';
	int server_id = atoi(++s_server_id);
	printf ("strServerId = %s, s_server_id = %s, 2*server_id = %d \n", strServerId, s_server_id, server_id*2);
	return 0;
}
