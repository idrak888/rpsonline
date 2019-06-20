import React, { Component } from 'react';

class SideBar extends Component {
    state = {
        usersInRoom: []
    }
    render (){
        return (
            <div className="SideBar">
                <div className="room-info">
                    <h5>{this.props.roomName}</h5>
                    <hr/>
                    <strong>In room:</strong>
                    {this.props.users.map(u => {
                        if (u.room == this.props.roomName) {
                            return <div className="user">{u.name}</div>
                        }
                    })}
                </div>
            </div>
        );
    }
}

export default SideBar;