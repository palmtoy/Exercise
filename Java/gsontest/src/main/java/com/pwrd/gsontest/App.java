package com.pwrd.gsontest;

import net.sf.json.JSONObject;

/**
 *
 */
public class App
{
	public static void main( String[] args ) {
		String json = "{id=\"1\", name=\"json\"}";
		JSONObject jsonObject = JSONObject.fromObject(json);
		System.out.println(jsonObject);
	}
}

