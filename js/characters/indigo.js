registerCharacter('indigo', {
    getStats: () => ({ speed: 3.7, weight: 0.9, type: 'indigo' }),
    attack: (player, type, projectiles) => {
        if (type === 'special') {
            player.isAttacking = true;
            player.inAttackLag = true;
            const gravityProps = { type: 'gravity', reach: 60, duration: 200, damage: 4, baseKnockback: 1, knockbackScaling: 0.05, color: 'rgba(75, 0, 130, 0.6)' };
            player.currentAttack = gravityProps;
            player.attackBox = { x: player.lastDirection > 0 ? player.x + player.width : player.x - gravityProps.reach, y: player.y, width: gravityProps.reach, height: player.height, color: gravityProps.color };
            setTimeout(() => {
                player.isAttacking = false; player.currentAttack = null;
            }, gravityProps.duration);
            setTimeout(() => { player.inAttackLag = false; }, gravityProps.duration + 300);
            return true;
        } else if (type === 'special2') {
            player.startCharge('special2');
            return true;
        }
    },
    endCharge: (player, type, projectiles, players) => {
        if (type === 'special2') {
            if (!player.isChargingSpecial2) return;
            player.isChargingSpecial2 = false;
            player.isCharging = false;
            player.inAttackLag = true;

            const pullOffset = 20;
            const opponent = players.find(p => p !== player);

            if (opponent) {
                const targetX = player.x + player.lastDirection * (player.width / 2 + pullOffset) - opponent.width / 2;
                opponent.x = targetX;
                opponent.velocityY = -5;
                opponent.hitstunFrames = 10;
            }
            setTimeout(() => { player.inAttackLag = false; }, 300);
        }
    }
});
