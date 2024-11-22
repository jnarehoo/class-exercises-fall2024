import React from "react";
import { useState } from "react";
import {Form, Input, InputNumber, Button, Carousel } from "antd";

// I used chatGPT to fix errors and figure out what things I needed to use/how they worked

export default function App() {
    const [tracks, setTracks] = useState([]); // State to hold track data
    const [loading, setLoading] = useState(false); // State for loading status

    // Function to fetch data from Spotify API
    async function fetchData(values) {
        const { searchTerm, limit } = values; // Get form input values
        const baseURL = "https://www.apitutor.org/spotify/simple/v1/search";
        const url = `${baseURL}?q=${encodeURIComponent(searchTerm)}&type=track&limit=${limit}`;

        setLoading(true);
        try {
            const response = await fetch(url);
            const data = await response.json();
            setTracks(data); // Update state with track data
        } catch (error) {
            console.error("Error fetching Spotify data:", error);
        } finally {
            setLoading(false);
        }
    }

    return  ( 
        <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
        <h1>Spotify Song Search</h1>

        {/* Ant Design Form */}
        <Form onFinish={fetchData} layout="vertical">
            <Form.Item
                name="searchTerm"
                label="Search Term"
                rules={[{ required: true, message: "Please enter a search term!" }]}
            >
                <Input placeholder="Enter artist, song, or album" />
            </Form.Item>

            <Form.Item
                name="limit"
                label="Number of Songs"
                rules={[{ required: true, message: "Please specify the number of songs!" }]}
            >
                <InputNumber min={1} max={20} placeholder="Enter a number (max 20)" />
            </Form.Item>

            <Button type="primary" htmlType="submit" loading={loading}>
                Search
            </Button>
        </Form>

        {/* Carousel to display tracks */}
        {tracks.length > 0 && (
            <Carousel autoplay>
                {tracks.map((track) => (
                    <div key={track.id} style={{ textAlign: "center" }}>
                        <iframe
                            src={`https://open.spotify.com/embed/track/${track.id}?utm_source=generator`}
                            width="100%"
                            height="352"
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                            style={{ borderRadius: 10 }}
                        ></iframe>
                        <h3 style={{ marginTop: 10 }}>{track.name}</h3>
                    </div>
                ))}
            </Carousel>
        )}
    </div>
    );
}
