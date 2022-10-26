import { useState } from "react";
import "./ViewGoal.css";

function ViewGoal() {
    return (
        <div className="GoalView">
            <header className="Goal-header">
                <nav className="Topbar">
                    <h1>Goal Title</h1>
                </nav>
            </header>
            <div className="MainContainer">
            <div className="GoalPreview">
                <label>
                    Name:
                    <input type="text" name="name" />
                </label>
                <input type="submit" value="Submit" />
            </div>

            </div>
        </div>
    )
}
export default ViewGoal;
