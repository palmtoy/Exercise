package msgpack;

import org.msgpack.annotation.Message;

import java.util.Map;

@Message // Annotation
public class SCMyMessage {
	// public fields are serialized.
	public Map<String, Integer> salaryTab;
}

