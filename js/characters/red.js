registerCharacter('red', {
    getStats: () => ({ speed: 3.8, weight: 1.0, type: 'red' }),
    attack: (player, type, projectiles) => {
        if (type === 'special') {
            player.inAttackLag = true;
            projectiles.push({
                x: player.x + (player.lastDirection > 0 ? player.width : 0),
                y: player.y + player.height / 2 - 4,
                dir: player.lastDirection,
                owner: player,
                width: 8, height: 8,
                damage: 5,
                baseKnockback: 3,
                knockbackScaling: 0.05
            });
            setTimeout(() => { player.inAttackLag = false; }, 300);
        } else if (type === 'special2') {
            player.startCharge('special2');
        }
    },
    endCharge: (player, type, projectiles) => {
        if (type === 'special2') {
            player.releaseChargeBeam();
        }
    }
});
