import React from 'react';
import avatar from '../avatar.png';
import caretup from '../caretup.png';
import send from '../send.png';

const Footer = props => {
    const sendGifInit = index => {
        props.sendGif(document.querySelectorAll('.gifs')[index].src);
    }
    return (
        <div className="Footer">
            <footer className="navbar fixed-bottom bg-dark">
                <div className="info">
                    {props.name} <img src={avatar} className="avatar"/>
                </div>
                <div className="chat-bar">
                    <p>
                        <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2">GIFS</button>
                    </p>
                    <div class="row">
                        <div class="col">
                            <div class="collapse multi-collapse" id="multiCollapseExample2">
                                <div class="bg-dark card card-body">
                                    <h2>Browse GIFS</h2>
                                    <form onSubmit={props.search}>
                                        <input autoComplete="off" id="search" type="text" placeholder="Search"/>    
                                    </form>
                                    <div className="gifs-holder">
                                        {props.gifs.map((g, index) => {
                                            return (
                                                <div key={index}>
                                                    <img src={g} className="gifs"/>
                                                    <div className="gif-overlay"></div>
                                                    <a className="send" data-toggle="collapse" data-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2" onClick={() => sendGifInit(index)}>send</a>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer;