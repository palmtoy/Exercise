package com.pwrd.gsontest;

import net.sf.json.JSONObject;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.net.URL;
import java.io.InputStream;
import org.apache.commons.io.IOUtils;

/**
 *
 */
public class App
{
	public static void main( String[] args ) throws IOException {
		URL resURL = App.class.getResource("/");
		String filePath = "data.json";
		String strJson;
		if(resURL != null) {
			System.out.println("\n1: ResURL = " + resURL);
			filePath = resURL.getPath() + filePath;
			strJson = new String(Files.readAllBytes(Paths.get(filePath)));
		} else {
			resURL = new URL("jar:file:target/gsontest-1.0.jar!/" + filePath);
			System.out.println("\n2: ResURL = " + resURL);
			InputStream fileStream = resURL.openStream();
			strJson = new String(IOUtils.toByteArray(fileStream));
		}

		JSONObject jsonObject = JSONObject.fromObject(strJson);
		System.out.println(jsonObject);

		Object str = jsonObject.get("charName");
		System.out.println(str);
	}
}

