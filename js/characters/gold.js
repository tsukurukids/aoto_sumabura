registerCharacter('gold', {
    getStats: () => ({ speed: 3.0, weight: 1.5, type: 'gold' }),
    attack: (player, type, projectiles) => {
        if (type === 'special') {
            player.inAttackLag = true;
            player.isAttacking = true;
            const pillarProps = { type: 'pillar', reach: 150, duration: 300, damage: 12, baseKnockback: 7, knockbackScaling: 0.1, color: 'rgba(255, 215, 0, 0.6)' };
            player.currentAttack = pillarProps;
            player.attackBox = { x: player.x + (player.width / 2) - 15, y: player.y - pillarProps.reach, width: 30, height: pillarProps.reach, color: pillarProps.color };
            setTimeout(() => { player.isAttacking = false; player.currentAttack = null; player.inAttackLag = false; }, pillarProps.duration + 100);
            return true;
        } else if (type === 'special2') {
            if (player.inAttackLag) return true;
            player.inAttackLag = true;
            player.isAttacking = true;
            player.damage += 30;
            player.attackStartTime = Date.now();
            const novaProps = { type: 'nova', reach: 500, duration: 2000, damage: 0.5, baseKnockback: 0.2, knockbackScaling: 0, color: 'rgba(255, 215, 0, 0.2)' };
            player.currentAttack = novaProps;
            player.attackBox = { x: player.x + player.width / 2, y: player.y + player.height / 2, width: 0, height: 0, color: novaProps.color };
            setTimeout(() => {
                player.isAttacking = false; player.currentAttack = null; player.attackBox = {};
                setTimeout(() => { player.inAttackLag = false; }, 500);
            }, novaProps.duration);
            return true;
        }
    }
});
