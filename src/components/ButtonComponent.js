import React from "react";
import Button from '@material-ui/core/Button';
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Badge from "@material-ui/core/Badge";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";

const style = {
    tasks: {
        "display": "flex",
    },
    checkbox_done: {
        "textDecoration": "line-through"
    },
    checkbox_default: {
        "textDecoration": 'none'
    },
    buttons: {
        padding: 100
    },
    finished_counter: {
        margin: 10
    }

}

class ButtonsComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = ({
            tasks: [],
            edit_enabled: true,
            })

        this.addTask = this.addTask.bind(this);
        this.removeTasks = this.removeTasks.bind(this)
        this.markAsDone = this.markAsDone.bind(this)
        this.toggleEditMode = this.toggleEditMode.bind(this)
    }

    render() {


        return (
            <div style={style.buttons}>
                <ButtonGroup color="primary" aria-label="primary button group">
                    <Button id="add_task" onClick={this.addTask}> Add Task {this.state.tasks.length}</Button>
                    <Button id="remove_task" onClick={this.removeTasks}> Remove Tasks</Button>
                </ButtonGroup>

                <FormControlLabel
                    control={<Switch checked={this.state.edit_enabled} onChange={this.toggleEditMode}/>}
                    label={this.switchLabel()}
                    labelPlacement="start"
                />

                <Badge badgeContent={this.finishedTasks()} color="secondary" style={style.finished_counter}>
                    <Typography>Finished</Typography>

                </Badge>

                <div style={style.tasks}>
                    {this.listTasks()}
                </div>
            </div>
        )

    }

    switchLabel() {
        return this.state.edit_enabled ? 'Edit On' : 'Edit Off'
    }

    finishedTasks() {
        let finishedTasks = this.state.tasks.filter(obj => obj.done === true)

        return finishedTasks.length
    }

    availableTasks() {

        let tasks = 0;
        if (this.state.tasks.length !== 0) {
            tasks = this.state.tasks.length;
        }

        return tasks
    }

    listTasks() {
        let tasks = [];
        for (let i = 0; i < this.state.tasks.length; i++) {

            tasks.push(<FormControlLabel
                style={(this.state.tasks[i].done) ? style.checkbox_done : style.checkbox_default}
                control={
                    <Checkbox id={this.state.tasks[i].id} checked={this.state.tasks[i].done}
                              onClick={this.markAsDone} value={this.state.tasks[i].name}/>
                }
                label={this.state.tasks[i].name}
                key={this.state.tasks[i].key}/>)

        }

        return tasks;
    }

    addTask() {
        let counter = this.state.tasks.length;
        let task = {
            done: false,
            id: 'task_' + counter,
            key: 'list_' + counter,
            name: 'Task ' + counter,
            style: 'checkbox_default'
        }
        let updatedList = this.state.tasks.concat(task)
        this.setState({tasks: updatedList});
    }

    removeTasks() {
        this.setState({tasks: []});
    }

    markAsDone(e) {

        if (this.state.edit_enabled) {
            // let toUpdate = this.state.tasks.filter(obj => obj.id === e.target.id)

            let list = this.state.tasks;

            list.map(obj =>
                (obj.id === e.target.id) ?
                    obj.done = !obj.done : obj
            )

            this.setState({tasks: list});
        }
    }

    toggleEditMode() {

        this.setState({
            edit_enabled: !this.state.edit_enabled
        })
    }
}

export default ButtonsComponent;