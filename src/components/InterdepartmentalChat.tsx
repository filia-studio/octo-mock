import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Send } from "lucide-react";

interface Message {
  id: string;
  sender: string;
  department: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

interface Channel {
  id: string;
  name: string;
  department: string;
  unread: number;
  lastMessage: string;
}

const mockChannels: Channel[] = [
  {
    id: "1",
    name: "Cardiology",
    department: "Cardiology",
    unread: 3,
    lastMessage: "Patient needs consultation"
  },
  {
    id: "2",
    name: "Emergency",
    department: "Emergency",
    unread: 0,
    lastMessage: "All clear"
  },
  {
    id: "3",
    name: "Radiology",
    department: "Radiology",
    unread: 1,
    lastMessage: "X-ray results ready"
  },
  {
    id: "4",
    name: "Laboratory",
    department: "Laboratory",
    unread: 5,
    lastMessage: "Blood work completed"
  },
  {
    id: "5",
    name: "Pharmacy",
    department: "Pharmacy",
    unread: 0,
    lastMessage: "Medication dispensed"
  }
];

const mockMessages: Message[] = [
  {
    id: "1",
    sender: "Dr. Smith",
    department: "Cardiology",
    content: "Good morning team. Patient in room 302 needs urgent consultation.",
    timestamp: "09:15 AM",
    isOwn: false
  },
  {
    id: "2",
    sender: "Dr. Jones",
    department: "Emergency",
    content: "I'll be there in 5 minutes.",
    timestamp: "09:17 AM",
    isOwn: false
  },
  {
    id: "3",
    sender: "You",
    department: "Cardiology",
    content: "Thank you. The patient's vitals are showing irregularities.",
    timestamp: "09:18 AM",
    isOwn: true
  },
  {
    id: "4",
    sender: "Nurse Williams",
    department: "Cardiology",
    content: "I've updated the medication chart and informed the family.",
    timestamp: "09:22 AM",
    isOwn: false
  }
];

export function InterdepartmentalChat() {
  const [channels] = useState<Channel[]>(mockChannels);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [selectedChannel, setSelectedChannel] = useState<Channel>(channels[0]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        sender: "You",
        department: selectedChannel.department,
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-170px)]">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Departments</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100vh-280px)]">
            <div className="space-y-1 p-4">
              {channels.map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => setSelectedChannel(channel)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedChannel.id === channel.id
                      ? "bg-primary/5 border border-primary/20"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{channel.name}</span>
                    {channel.unread > 0 && (
                      <Badge variant="default" className="h-5 w-5 flex items-center justify-center p-0">
                        {channel.unread}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 truncate">{channel.lastMessage}</p>
                </button>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="lg:col-span-3 flex flex-col">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle>{selectedChannel.name}</CardTitle>
            <Badge variant="outline">{selectedChannel.department}</Badge>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.isOwn ? "flex-row-reverse" : "flex-row"}`}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {message.sender
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`flex-1 ${message.isOwn ? "items-end" : "items-start"} flex flex-col`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">{message.sender}</span>
                      <span className="text-xs text-gray-500">{message.timestamp}</span>
                    </div>
                    <div
                      className={`rounded-lg p-3 max-w-[70%] ${
                        message.isOwn
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p>{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
