package msgpack;

import org.msgpack.annotation.Message;

@Message // Annotation
public class CSMyMessage {
	// public fields are serialized.
	public String name;
	public double version;
}

