#include <stdio.h>
#include <stdlib.h>
#include "cJSON.h"

#define cfgFile "conf.json"

int main() {
	FILE* file = NULL;
	char* data = NULL;
	long len = 0;

	// open config file
	if (cfgFile == NULL || (file = fopen(cfgFile, "rb")) == NULL) {
		printf("open file fail! %s", cfgFile);
		return -1;
	}

	// get file len
	if (fseek(file, 0, SEEK_END) != 0 || (len = ftell(file)) == 0 || fseek(file, 0, SEEK_SET) != 0) {
		printf("cfgFile len error! len: %ld", len);
		fclose(file);
		return -1;
	}

	if ((data = (char*)malloc(len+1)) == NULL || fread(data, 1, len, file) != len) {
		printf("read data fail!");
		fclose(file);
		return -1;
	};

	// close file
	fclose(file);

	// json parse
	cJSON* jRoot = cJSON_Parse(data);
	if (jRoot == NULL) {
		free(data);
		const char *error_ptr = cJSON_GetErrorPtr();
		if (error_ptr != NULL) {
			printf("cJSON_Parse failed! [%s]\n", error_ptr);
		}
		return -1;
	}

	cJSON* jName = cJSON_GetObjectItem(jRoot, "name");
	if (cJSON_IsString(jName) && (jName->valuestring != NULL)) {
		char *strName = cJSON_Print(jName);
		printf("1 ~ name: %s\n", strName);
		printf("2 ~ name: %s\n\n", jName->valuestring);
		free(strName);
	}

	cJSON *jHobby = cJSON_GetObjectItem(jRoot, "hobby");
	if (cJSON_IsString(jHobby) && (jHobby->valuestring != NULL)) {
		char *strHobby = cJSON_Print(jHobby);
		printf("A ~ strHobby: %s\n", strHobby);
		printf("B ~ strHobby: %s\n", jHobby->valuestring);
		free(strHobby);
	}

	cJSON_Delete(jRoot);
	free(data);
}

