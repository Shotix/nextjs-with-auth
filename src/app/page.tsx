"use client";

import React from "react";
import { Button } from "antd";
import Modal from "@/components/ant-design/Modal";

const Dashboard: React.FC = () => {
    const [showModal, setShowModal] = React.useState(false);
    
    return (
        <p>
            Welcome to your dashboard!
            
            <Button type={"primary"} onClick={() => {setShowModal(true)}}>Modal</Button>
            <Modal 
                title={"Test Modal"} 
                open={showModal} 
                onOk={() => console.log("Modal ok")} 
                onCancel={() => console.log("Modal cancel")}
            >
                <h1>Test Modal</h1>
                <p>Testing if the content works correctly</p>
            </Modal>
        </p>
    )
}

export default Dashboard;