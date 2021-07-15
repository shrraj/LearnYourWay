import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { modules } from './Module';
import { Card3 } from '../Card';

function Content() {
    const location = useLocation();
    const id = location.state.mid - 1;
    const module = modules[id];

    return (
        <div>
            <div className="container-fluid row mod">
                <div className='testName col wid' >
                    <Card3 title={module.title} content={module.content}
                        img="" button="Test Yourself" link='/test1' mid={module.id}
                        header="Frontend Module" />
                </div>
            </div>
        </div>
    );
}

export default Content;
