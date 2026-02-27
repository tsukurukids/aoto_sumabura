registerCharacter('brown', {
    getStats: () => ({ speed: 3.4, weight: 1.15, type: 'brown' }),
    attack: (player, type, projectiles, earthBlocks) => {
        if (type === 'special') {
            player.isAttacking = true;
            player.inAttackLag = true;
            const waveProps = { type: 'earthwave', reach: 150, duration: 400, damage: 8, baseKnockback: 2.5, knockbackScaling: 0.06, color: 'rgba(139, 69, 19, 0.7)' };
            player.currentAttack = waveProps;
            const waveHeight = 25;
            const waveY = player.y + player.height - waveHeight;
            player.attackBox = { x: player.lastDirection > 0 ? player.x + player.width : player.x - waveProps.reach, y: waveY, width: waveProps.reach, height: waveHeight, color: waveProps.color };
            setTimeout(() => {
                player.isAttacking = false; player.currentAttack = null;
            }, waveProps.duration);
            setTimeout(() => { player.inAttackLag = false; }, waveProps.duration + 200);
            return true;
        } else if (type === 'special2') {
            if (player.inAttackLag) return true;
            player.inAttackLag = true;
            const blockSize = 40;
            const placeX = player.lastDirection > 0 ? player.x + player.width + 10 : player.x - blockSize - 10;
            const placeY = player.y + player.height - blockSize;

            const myBlocks = earthBlocks.filter(b => b.owner === player);
            if (myBlocks.length >= 8) {
                const oldestIndex = earthBlocks.indexOf(myBlocks[0]);
                if (oldestIndex > -1) earthBlocks.splice(oldestIndex, 1);
            }

            earthBlocks.push({ x: placeX, y: placeY, width: blockSize, height: blockSize, owner: player, color: '#8B4513' });
            setTimeout(() => { player.inAttackLag = false; }, 200);
            return true;
        }
    }
});
