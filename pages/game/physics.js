import Matter from "matter-js";
import { Dimensions } from "react-native";

const Physics = (entities, { time, events, dispatch }) => {

    let MAX_WIDTH = Dimensions.get("screen").width;
    let MAX_HEIGHT = Dimensions.get("screen").height;
    
    let engine = entities.physics.engine;
    let player = entities.player.body;
    let enemy = entities.enemy.body;

    if (events.length) {
        for (let i = 0; i < events.length; i++) {
            if (events[i].control === "move-up") {
                Matter.Body.setVelocity(player, { x: 0, y: -8 });
            } else if (events[i].control === "move-left") {
                Matter.Body.setVelocity(player, { x: -8, y: 0 });
            } else if (events[i].control === "move-right") {
                Matter.Body.setVelocity(player, { x: 8, y: 0 });
            } else if (events[i].control === "move-down") {
                Matter.Body.setVelocity(player, { x: 0, y: 8 });
            }
        }
    }

    if (entities.enemy.body.bounds.max.x <= 0) {
        Matter.Body.setPosition(enemy, { x: (MAX_WIDTH / 2) + 200, y: (MAX_HEIGHT / 2) + 100 });
    } else if (entities.enemy.body.bounds.max.x >= MAX_WIDTH - 50) {
        Matter.Body.setPosition(player, { x: (MAX_WIDTH / 2) + 200, y: (MAX_HEIGHT / 2) + 100 });
        dispatch({ type: "Question" });
    }

    Matter.Body.translate(enemy, { x: -4, y: 0 });
    
    if (entities.player.body.bounds.max.x <= 0) {
        Matter.Body.setPosition(player, { x: MAX_WIDTH - 140, y: (MAX_HEIGHT / 2) + 100 });
    } else if (entities.player.body.bounds.min.x > MAX_WIDTH - 140) {
        Matter.Body.setPosition(player, { x: MAX_WIDTH - (MAX_WIDTH - 25), y: (MAX_HEIGHT / 2) + 100 });
    }
    
    Matter.Engine.update(engine, time.delta);

    return entities;
}

export default Physics;