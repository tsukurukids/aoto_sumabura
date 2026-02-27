registerCharacter('black', {
    getStats: () => ({ speed: 3.5, weight: 1.0, type: 'black' }),
    init: (player) => {
        player.hp = 120;
        player.damage = 0;
    },
    attack: (player, type, projectiles, earthBlocks, blackHoles) => {
        if (type === 'normal') {
            player.isAttacking = true;
            let props = { reach: 50, duration: 150, damage: 7, baseKnockback: 3.5, knockbackScaling: 0.08, color: 'rgba(255, 255, 0, 0.5)', onHit: 'slow' };
            player.currentAttack = props;
            player.attackBox = { x: player.lastDirection > 0 ? player.x + player.width : player.x - props.reach, y: player.y, width: props.reach, height: player.height, color: props.color };
            setTimeout(() => {
                player.isAttacking = false; player.currentAttack = null; player.attackBox = {}; player.inAttackLag = true;
                setTimeout(() => { player.inAttackLag = false; }, 100);
            }, props.duration);
            return true;
        } else if (type === 'special') {
            player.inAttackLag = true;
            const existingBlackHole = blackHoles.find(bh => bh.owner === player);
            if (!existingBlackHole) {
                blackHoles.push({
                    x: player.x + (player.lastDirection > 0 ? player.width : -60),
                    y: player.y + player.height / 2 - 30,
                    owner: player,
                    width: 60, height: 60,
                    duration: 5000,
                    createdAt: Date.now()
                });
            }
            setTimeout(() => { player.inAttackLag = false; }, 300);
            return true;
        }
    }
});
