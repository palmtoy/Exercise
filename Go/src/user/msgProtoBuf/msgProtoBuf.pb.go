// Code generated by protoc-gen-go.
// source: msgProtoBuf.proto
// DO NOT EDIT!

package msgProtoBuf

import proto "code.google.com/p/goprotobuf/proto"
import json "encoding/json"
import math "math"

// Reference proto, json, and math imports to suppress error if they are not otherwise used.
var _ = proto.Marshal
var _ = &json.SyntaxError{}
var _ = math.Inf

// go中导出结构体、方法必须大写
type Msg struct {
	MsgType          *int32  `protobuf:"varint,1,req" json:"MsgType,omitempty"`
	MsgInfo          *string `protobuf:"bytes,2,req" json:"MsgInfo,omitempty"`
	MsgFrom          *string `protobuf:"bytes,3,req" json:"MsgFrom,omitempty"`
	XXX_unrecognized []byte  `json:"-"`
}

func (m *Msg) Reset()         { *m = Msg{} }
func (m *Msg) String() string { return proto.CompactTextString(m) }
func (*Msg) ProtoMessage()    {}

func (m *Msg) GetMsgType() int32 {
	if m != nil && m.MsgType != nil {
		return *m.MsgType
	}
	return 0
}

func (m *Msg) GetMsgInfo() string {
	if m != nil && m.MsgInfo != nil {
		return *m.MsgInfo
	}
	return ""
}

func (m *Msg) GetMsgFrom() string {
	if m != nil && m.MsgFrom != nil {
		return *m.MsgFrom
	}
	return ""
}

func init() {
}
