registerCharacter('kohaku', {
    getStats: () => ({ speed: 3.7, weight: 1.0, type: 'kohaku' }),
    attack: (player, type, projectiles) => {
        if (type === 'normal') {
            player.isAttacking = true;
            let props = { reach: 50, duration: 200, damage: 9, baseKnockback: 7.0, knockbackScaling: 0.1, type: 'upswing', color: 'rgba(255, 153, 0, 0.6)' };
            player.currentAttack = props;
            player.attackBox = { x: player.lastDirection > 0 ? player.x + player.width : player.x - props.reach, y: player.y - 65, width: props.reach, height: player.height + 75, color: props.color };
            setTimeout(() => {
                player.isAttacking = false; player.currentAttack = null; player.attackBox = {}; player.inAttackLag = true;
                setTimeout(() => { player.inAttackLag = false; }, 100);
            }, props.duration);
            return true;
        } else if (type === 'special') {
            player.startCharge('special');
            return true;
        } else if (type === 'special2') {
            if (!player.isOnGround && player.jumpsLeft <= 0) return true;
            player.inAttackLag = true;
            player.isSuperArmor = true;
            player.velocityY = -13;
            player.isOnGround = false;
            setTimeout(() => { player.velocityY = 25; }, 200);
            setTimeout(() => {
                player.velocityY = 0; player.velocityX = 0;
                player.isAttacking = true;
                const diveSlashProps = { reach: 80, duration: 200, damage: 15, baseKnockback: 7, knockbackScaling: 0.12, color: 'rgba(255, 69, 0, 0.9)' };
                player.currentAttack = diveSlashProps;
                player.attackBox = { x: player.lastDirection > 0 ? player.x + player.width : player.x - diveSlashProps.reach, y: player.y, width: diveSlashProps.reach, height: player.height, color: diveSlashProps.color };
                setTimeout(() => { player.isAttacking = false; player.currentAttack = null; }, diveSlashProps.duration);
            }, 350);
            setTimeout(() => { player.inAttackLag = false; player.isSuperArmor = false; }, 600);
            return true;
        }
    },
    endCharge: (player, type, projectiles) => {
        if (type === 'special') {
            player.releaseKohakuChargeBeam();
        }
    }
});
