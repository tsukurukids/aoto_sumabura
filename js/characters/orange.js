registerCharacter('orange', {
    getStats: () => ({ speed: 3.6, weight: 1.05, type: 'orange' }),
    attack: (player, type, projectiles) => {
        if (type === 'normal') {
            player.isAttacking = true;
            let props = { reach: 15, duration: 150, damage: 10, baseKnockback: 7.0, knockbackScaling: 0.16, color: 'rgba(255, 255, 0, 0.5)' };
            player.currentAttack = props;
            player.attackBox = { x: player.lastDirection > 0 ? player.x + player.width : player.x - props.reach, y: player.y, width: props.reach, height: player.height, color: props.color };
            setTimeout(() => {
                player.isAttacking = false; player.currentAttack = null; player.attackBox = {}; player.inAttackLag = true;
                setTimeout(() => { player.inAttackLag = false; }, 100);
            }, props.duration);
            return true;
        } else if (type === 'special') {
            player.inAttackLag = true;
            player.isCharging = true;
            setTimeout(() => {
                player.isCharging = false;
                if (player.hitstunFrames > 0) { player.inAttackLag = false; return; }
                player.isAttacking = true;
                const laserProps = { type: 'laser', reach: 600, duration: 200, damage: 15, baseKnockback: 6, knockbackScaling: 0.11, color: 'rgba(255, 165, 0, 0.8)' };
                player.currentAttack = laserProps;
                const laserY = player.y + player.height / 2 - 2.5;
                player.attackBox = { x: player.lastDirection > 0 ? player.x + player.width : player.x - laserProps.reach, y: laserY, width: laserProps.reach, height: 5, color: laserProps.color };
                setTimeout(() => {
                    player.isAttacking = false; player.currentAttack = null;
                    setTimeout(() => { player.inAttackLag = false; }, 300);
                }, laserProps.duration);
            }, 1800);
            return true;
        }
    }
});
