registerCharacter('red-white', {
    getStats: () => ({ speed: 3.7, weight: 1.0, type: 'red-white' }),
    attack: (player, type, projectiles) => {
        if (type === 'special') {
            player.inAttackLag = true;
            const offset = 75;
            const createCross = (size, thickness, damage, knockback, duration, delay, speed = 0) => {
                setTimeout(() => {
                    const centerX = player.x + player.width / 2 + (offset * player.lastDirection);
                    const centerY = player.y + player.height / 2;
                    const crossVelocityX = speed * player.lastDirection;
                    // Horizontal
                    projectiles.push({
                        x: centerX - size / 2, y: centerY - thickness / 2,
                        velocityX: crossVelocityX, velocityY: 0,
                        owner: player, width: size, height: thickness,
                        damage: damage, baseKnockback: knockback, knockbackScaling: 0.07,
                        createdAt: Date.now(), duration: duration, isCrossPart: true
                    });
                    // Vertical
                    projectiles.push({
                        x: centerX - thickness / 2, y: centerY - size / 2,
                        velocityX: crossVelocityX, velocityY: 0,
                        owner: player, width: thickness, height: size,
                        damage: damage, baseKnockback: knockback, knockbackScaling: 0.07,
                        createdAt: Date.now(), duration: duration, isCrossPart: true
                    });
                }, delay);
            };
            createCross(80, 10, 4, 2, 200, 0, 0);
            createCross(100, 12, 4, 2, 200, 150, 0);
            createCross(120, 14, 4, 2, 200, 300, 0);
            createCross(140, 16, 5, 2.5, 300, 450, 4);
            createCross(160, 18, 6, 3, 300, 600, 6);
            setTimeout(() => { player.inAttackLag = false; }, 1000);
            return true;
        } else if (type === 'special2') {
            if (player.inAttackLag) return true;
            player.inAttackLag = true;
            const numSegments = 12;
            const segmentLength = 40;
            let startX = player.x + player.width / 2;
            let startY = player.y + player.height / 2;
            let angle = player.lastDirection > 0 ? 0 : Math.PI;
            for (let i = 0; i < numSegments; i++) {
                angle += (Math.random() - 0.5) * 0.52;
                const endX = startX + Math.cos(angle) * segmentLength;
                const endY = startY + Math.sin(angle) * segmentLength;
                const steps = 8;
                for (let j = 0; j < steps; j++) {
                    const ratio = j / steps;
                    const px = startX + (endX - startX) * ratio;
                    const py = startY + (endY - startY) * ratio;
                    projectiles.push({
                        x: px - 3, y: py - 3, velocityX: 0, velocityY: 0,
                        owner: player, width: 6, height: 6, damage: 1,
                        baseKnockback: 2, knockbackScaling: 0.05, duration: 400,
                        createdAt: Date.now(), color: Math.random() > 0.5 ? '#FF0000' : '#FFFFFF', isCrossPart: true
                    });
                }
                startX = endX; startY = endY;
            }
            setTimeout(() => { player.inAttackLag = false; }, 500);
            return true;
        }
    }
});
