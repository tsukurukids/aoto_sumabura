registerCharacter('purple', {
    getStats: () => ({ speed: 3.8, weight: 0.98, type: 'purple' }),
    attack: (player, type, projectiles) => {
        if (type === 'special') {
            player.inAttackLag = true;
            player.x += 150 * player.lastDirection;
            setTimeout(() => { player.inAttackLag = false; }, 200);
            return true;
        } else if (type === 'special2') {
            if (player.inAttackLag) return true;
            player.inAttackLag = true;
            player.isAttacking = true;
            let props1 = { reach: 60, duration: 50, damage: 5, baseKnockback: 2, knockbackScaling: 0.05, color: 'rgba(255, 0, 0, 0.6)' };
            player.currentAttack = props1;
            player.attackBox = { x: player.lastDirection > 0 ? player.x + player.width : player.x - props1.reach, y: player.y, width: props1.reach, height: player.height, color: props1.color };
            setTimeout(() => {
                player.isAttacking = false; player.currentAttack = null;
            }, props1.duration);

            for (let i = 0; i < 4; i++) {
                setTimeout(() => {
                    player.isAttacking = true;
                    let props2 = { reach: 60, duration: 50, damage: 3, baseKnockback: 2, knockbackScaling: 0.05, color: 'rgba(155, 89, 182, 0.6)' };
                    player.currentAttack = props2;
                    player.attackBox = { x: player.lastDirection > 0 ? player.x + player.width : player.x - props2.reach, y: player.y, width: props2.reach, height: player.height, color: props2.color };
                    setTimeout(() => {
                        player.isAttacking = false; player.currentAttack = null;
                    }, props2.duration);
                }, 50 * (i + 1));
            }
            setTimeout(() => { player.inAttackLag = false; }, 250);
            return true;
        }
    }
});
