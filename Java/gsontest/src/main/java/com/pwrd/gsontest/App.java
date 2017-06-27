package com.pwrd.gsontest;

import net.sf.json.JSONObject;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

/**
 *
 */
public class App
{
	public static void main( String[] args ) throws IOException {
		String filePath = App.class.getResource("/").getPath() + "data.json";
		String strJson = new String(Files.readAllBytes(Paths.get(filePath)));

		JSONObject jsonObject = JSONObject.fromObject(strJson);
		System.out.println(jsonObject);

		Object str = jsonObject.get("charName");
		System.out.println(str);
	}
}

