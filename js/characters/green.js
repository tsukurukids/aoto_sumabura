registerCharacter('green', {
    getStats: () => ({ speed: 4.0, weight: 0.95, type: 'green' }),
    attack: (player, type, projectiles) => {
        if (type === 'normal') {
            projectiles.push({
                x: player.x + (player.lastDirection > 0 ? player.width : 0),
                y: player.y + player.height / 2 - 15,
                velocityX: 12 * player.lastDirection,
                velocityY: 0,
                owner: player,
                width: 20, height: 30,
                damage: 3,
                baseKnockback: 2,
                knockbackScaling: 0.02,
                color: '#50c878',
                duration: 180,
                createdAt: Date.now()
            });
            player.inAttackLag = true;
            setTimeout(() => {
                player.inAttackLag = false;
            }, 10);
        } else if (type === 'special') {
            player.inAttackLag = true;
            player.isDashing = true;
            player.velocityX = 18 * player.lastDirection;
            setTimeout(() => { player.isDashing = false; player.inAttackLag = false; }, 300);
        }
    }
});
