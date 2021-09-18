import React from 'react';
import ListProject from '../projects/ListProject';
import NewProject from '../projects/NewProject';
import './Layout.css';

const Sidebar = () => {
    return (
        <aside className="aside">
            <h1>Admin<span className="span">Projects</span></h1>

            <NewProject />
            
            <div className="projects">
                <h2>Tus proyectos</h2>
                <ListProject />
            </div>
        </aside>
    )
}

export default Sidebar;