package com.pwrd.gsontest;

import net.sf.json.JSONObject;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.net.URL;


/**
 *
 */
public class App
{
	public static void main( String[] args ) throws IOException {
		URL resURL = App.class.getResource("/");
		String filePath = "data.json";
		if(resURL != null) {
			filePath = resURL.getPath() + filePath;
		} else {
			filePath = "./src/main/resources/" + filePath;
		}
		System.out.println("\nFilePath = " + filePath + "\n");

		String strJson = new String(Files.readAllBytes(Paths.get(filePath)));
		JSONObject jsonObject = JSONObject.fromObject(strJson);
		System.out.println(jsonObject);

		Object str = jsonObject.get("charName");
		System.out.println(str);
	}
}

