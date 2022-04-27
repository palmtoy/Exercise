#include <stdio.h>
#include <stdlib.h>
#include "cJSON.h"

#define cfgFile "conf.json"

int main() {
	cJSON* root = NULL;
	FILE* file = NULL;
	char* data = NULL;
	long len = 0;

	// open config file
	if(cfgFile == NULL || (file = fopen(cfgFile, "rb")) == NULL) {
		printf("open file fail! %s", cfgFile);
		return -1;
	}

	// get file len
	if(fseek(file, 0, SEEK_END) != 0 || (len = ftell(file)) == 0 || fseek(file, 0, SEEK_SET) != 0) {
		printf("cfgFile len error! len: %ld", len);
		fclose(file);
		return -1;
	}

	if((data = (char*)malloc(len+1)) == NULL || fread(data, 1, len, file) != len) {
		printf("read data fail!");
		fclose(file);
		return -1;
	};

	// close file
	fclose(file);

	// json parse
	root = cJSON_Parse(data);
	if(root == NULL) {
		free(data);
		printf("cJSON_Parse fail! [%s]\n", cJSON_GetErrorPtr());
		return -1;
	}

	cJSON* name_json = cJSON_GetObjectItem(root, "name");
	if (name_json != NULL) {
		char *name = cJSON_Print(name_json);
		printf("name: %s\n", name);
		free(name);
	}

	cJSON *hobby_json = cJSON_GetObjectItem(root, "hobby");
	if (hobby_json != NULL) {
		char *strHobby = cJSON_Print(hobby_json);
		printf("strHobby: %s\n", strHobby);
		free(strHobby);
	}

	cJSON_Delete(root);
	free(data);
}

