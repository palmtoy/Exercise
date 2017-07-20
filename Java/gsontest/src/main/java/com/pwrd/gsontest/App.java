package com.pwrd.gsontest;

import net.sf.json.JSONObject;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.net.URL;
import java.io.InputStream;
import java.util.Date;
import java.util.Timer;
import java.util.TimerTask;
import org.apache.commons.io.IOUtils;


public class App {
	public static void main( String[] args ) {
		System.out.println("\n" + new Date() + " ~ Go ...");
		new ScheduledTask(30);
	}
}


// after some seconds, do something.
class ScheduledTask {
	// interval: some seconds
	ScheduledTask(long interval) {
		Timer timer = new Timer();
		TimerTask _doTask = new TimerTask() {
			public void run() {
				System.out.println(new Date() + " ~ Run ->");
				URL resURL = App.class.getResource("/");
				String filePath = "data.json";
				String strJson = null;
				try {
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
				} catch (IOException ignored) {}
				JSONObject jsonObject = JSONObject.fromObject(strJson);
				System.out.println(jsonObject);

				Object str = jsonObject.get("charName");
				System.out.println(str);
				System.exit(1);
			}
		};
		long timeSpan = System.currentTimeMillis() + interval * 1000;
		timer.schedule(_doTask, new Date(timeSpan));
	}
}

