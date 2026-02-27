registerCharacter('grey', {
    getStats: () => ({ speed: 3.5, weight: 1.0, type: 'grey' }),
    attack: (player, type, projectiles) => {
        if (type === 'special') {
            if (player.isSizeChanging) { player.inAttackLag = false; return true; }
            player.inAttackLag = true;
            player.isSizeChanging = true;
            player.isGiant = true;
            player.width = player.originalWidth * 3;
            player.height = player.originalHeight * 3;
            setTimeout(() => {
                player.width = player.originalWidth;
                player.height = player.originalHeight;
                player.isSizeChanging = false;
                player.isGiant = false;
            }, 4000);
            setTimeout(() => { player.inAttackLag = false; }, 300);
            return true;
        } else if (type === 'special2') {
            if (player.isSizeChanging) { player.inAttackLag = false; return true; }
            player.inAttackLag = true;
            player.isSizeChanging = true;
            player.isSmall = true;
            player.width = player.originalWidth / 4;
            player.height = player.originalHeight / 4;
            setTimeout(() => {
                player.width = player.originalWidth;
                player.height = player.originalHeight;
                player.isSizeChanging = false;
                player.isSmall = false;
            }, 5000);
            setTimeout(() => { player.inAttackLag = false; }, 300);
            return true;
        }
    }
});
