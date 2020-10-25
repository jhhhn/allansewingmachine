import React from 'react';
import UserLayout from '../layout/user-layout.js';
import MyButton from '../components/custom/button';
import UserHistoryBlock from '../components/custom/history-block';

const UserDashboard = ({user}) => {
    return (
        <UserLayout>
            <div>
                <div className="user_nfo_panel">
                    <h1>User information</h1>
                    <p>Name: <span>{user.name}</span></p>
                    <span>Email: {user.email}</span>
                    <span>Contact: {user.contact}</span>
                    <span>Address: {user.address.unit}, {user.address.street}, {user.address.city}, {user.address.state}</span>
                    
                    <MyButton
                        type="default"
                        title="Edit account info"
                        linkTo="/user/user_profile"
                    />
                </div>

                    <div className="user_nfo_panel">
                        <h1>History purchases</h1>
                        <div className="user_product_block_wrapper">
                            <UserHistoryBlock />
                        </div>            
                    </div>

                
            </div>
        </UserLayout>
        
    );
};

export default UserDashboard;