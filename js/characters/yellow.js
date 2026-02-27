registerCharacter('yellow', {
    getStats: () => ({ speed: 3.3, weight: 1.1, type: 'yellow' }),
    attack: (player, type, projectiles) => {
        if (type === 'special') {
            player.inAttackLag = true;
            player.isAttacking = true;
            if (!player.isOnGround) { player.velocityY = 5; }
            const stompProps = { type: 'stomp', reach: 60, duration: 250, damage: 11, baseKnockback: 6, knockbackScaling: 0.1, color: 'rgba(255, 165, 0, 0.6)' };
            player.currentAttack = stompProps;
            player.attackBox = { x: player.x + (player.width - stompProps.reach) / 2, y: player.y + player.height, width: stompProps.reach, height: 20, color: stompProps.color };
            setTimeout(() => { player.isAttacking = false; player.currentAttack = null; player.inAttackLag = false; }, stompProps.duration);
            return true;
        } else if (type === 'special2') {
            if (player.inAttackLag) return true;
            player.inAttackLag = true;
            player.isAttacking = true;
            player.velocityY = -12;
            player.velocityX = 15 * player.lastDirection;
            player.isOnGround = false;
            const tackleProps = { type: 'tackle', reach: 0, duration: 500, damage: 12, baseKnockback: 8, knockbackScaling: 0.1, color: 'rgba(255, 215, 0, 0)' };
            player.currentAttack = tackleProps;
            player.attackBox = { x: player.x - 5, y: player.y - 5, width: player.width + 10, height: player.height + 10, color: tackleProps.color };
            setTimeout(() => {
                player.isAttacking = false; player.currentAttack = null; player.inAttackLag = false;
                player.velocityX *= 0.5;
            }, tackleProps.duration);
            return true;
        }
    }
});
