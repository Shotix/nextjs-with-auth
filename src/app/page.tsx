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
                onCancel={() => console.log("Modal cancel")}>
                <p>Test</p>
            </Modal>
        </p>
    )
}

export default Dashboard;