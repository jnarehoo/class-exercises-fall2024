import { React, useState, useEffect } from "react";
import {
    Button,
    Form,
    Input,
    InputNumber,
    Select,
    Checkbox,
    Row,
    Col,
    Switch,
    Space,
} from "antd";

export default function CourseSearchForm({ fetchCourses }) {
    const [departments, setDepartments] = useState([]); // Add state for departments
    const rootURL = "http://localhost:8000"; // finally figured out the issue and it was bc it didnt know the rootURL
    useEffect(() => {
        // like fetch username from api.jsx
        async function fetchDepartments() {
            try {
                const response = await fetch(`${rootURL}/api/departments`);
                if (!response.ok) {
                    throw new Error(`Error fetching departments: ${response.statusText}`);
                }
                const data = await response.json();
                console.log("Fetched departments:", data); // Log the fetched data
                setDepartments(data);
            } catch (error) {
                console.error("Failed to fetch departments:", error);
            }
        }

        fetchDepartments();
    }, []);
    

    const classificationOpts = [
        { key: "fys", value: "First Year Seminar" },
        { key: "di", value: "Diversity Intensive" },
        { key: "dir", value: "Diversity Intensive - Race" },
        { key: "arts", value: "Arts" },
        { key: "honors", value: "Honors" },
        { key: "service", value: "Service Learning" },
    ];


    // I used google and AI to try to figure this out but I couldn't get it to work or understand how to get closer to it working. 
    const handleFormSubmit = (formData) => {
        const queryParams = {
            title: formData.title,
            instructor: formData.instructor,
            department: formData.department,
            hours: formData.hours,
            diversity_intensive: formData.diversity_intensive,
            diversity_intensive_r: formData.diversity_intensive_r,
            honors: formData.honors,
            open: formData.open,
            days: formData.days,
        };

        // added this from an AI to help with it not working properly
        if (formData.classifications) {  
            if (formData.classifications.includes("di")) {  
             queryParams.diversity_intensive = true;  
            }  
            if (formData.classifications.includes("dir")) {  
             queryParams.diversity_intensive_r = true;  
            }  
            if (formData.classifications.includes("honors")) {  
             queryParams.honors = true;  
            }  
           } 

        // Add fields to query string if they exist
        if (title) 
            queryParams.append("title", title);

        if (classifications && classifications.length > 0) 
            queryParams.append("designation", classifications.join(","));

        if (instructor) 
            queryParams.append("instructor", instructor);

        if (department) 
            queryParams.append("department", department);

        if (hours) 
            queryParams.append("hours", hours);

        if (days && days.length > 0) 
            queryParams.append("days", days);

        if (open !== undefined) 
            queryParams.append("open", open ? "true" : "false");

        // Create the URL with query parameters
        const url = `${rootURL}/api/courses?${queryParams.toString()}`;
        console.log("Generated URL:", url); // For debugging
        //console.log("Here's the form data:", formData);
        // fetchCourses is a function defined in the parent component (App.jsx).
        // It was passed into this component as a prop.
        fetchCourses(formData);
    };

    return (
        <Form
            name="basic"
            labelCol={{
                span: 8,
                style: { fontWeight: "600" },
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={handleFormSubmit}
            className="bg-white p-6 lg:rounded-md mx-auto border-gray-200 border mb-6"
        >
            <Row>
                <Col xs={20} md={12}>
                    {/* Title */}
                    <Form.Item label="Course Title" name="title">
                        <Input />
                    </Form.Item>

                    {/* Special Designations */}
                    <Form.Item name="classifications" label="Designation:">
                        <Checkbox.Group>
                            <Space direction="vertical">
                                {classificationOpts.map((opt) => (
                                    <Checkbox key={opt.key} value={opt.key}>
                                        {opt.value}
                                    </Checkbox>
                                ))}
                            </Space>
                        </Checkbox.Group>
                    </Form.Item>
                </Col>
                <Col xs={20} md={12}>
                    {/* Instructor */}
                    <Form.Item label="Instructor" name="instructor">
                        <Input />
                    </Form.Item>

                    {/* Department */}
                    <Form.Item label="Department" name="department">
                        <Select>
                            <Select.Option value="">Any</Select.Option>
                            
                            {departments.map((dept) => (  
                                <Select.Option key={dept} value={dept}>  
                                    {dept}  
                                </Select.Option>  
                            ))} 
                        </Select>
                    </Form.Item>

                    {/* Credit Hours */}
                    <Form.Item label="Credit Hours" name="hours">
                        <InputNumber
                            style={{
                                width: "100px",
                            }}
                        />
                    </Form.Item>

                    {/* Days */}
                    <Form.Item name="days" label="Days:">
                        <Checkbox.Group>
                            <Space>
                                {["M", "T", "W", "R", "F"].map((day) => (
                                    <Checkbox key={day} value={day}>
                                        {day}
                                    </Checkbox>
                                ))}
                            </Space>
                        </Checkbox.Group>
                    </Form.Item>

                    {/* Open Only */}
                    <Form.Item
                        label="Open Only:"
                        name="open"
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={10}>
                    <Form.Item
                        wrapperCol={{
                            offset: 9,
                            span: 16,
                        }}
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="bg-blue-900 hover:bg-blue-800"
                        >
                            Search
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}
