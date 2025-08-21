# 🎮 Jump & Score Game (Frontend)

## 📌 Requirement
Develop a simple 2D game where:

- A ball/character moves continuously on the floor.  
- The ball can jump whenever an obstacle appears.  
- **Points system:** +1 point every time the player successfully jumps.  
- **Game Over** occurs if the ball collides with an obstacle.  
- **Best score** should be stored using **cookies** (❌ not `localStorage`).  
- After each game, show a comparison between current score and best score.  

---

## 🕹️ Game Rules
1. The character moves automatically (left → right).  
2. When the player presses **spacebar / tap / click**, the character jumps.  
3. If the character successfully avoids an obstacle → **+1 point**.  
4. If the character hits an obstacle → **Game Over**.  
5. After Game Over:  
   - Show **current score**.  
   - Compare with **best score (stored in cookies)**.  
   - Display message:  
     - 🎉 *“Congratulations! New Best Score!”* (if new high score achieved)  
     - 😔 *“You scored less than your best. Keep trying!”* (if lower).  

---

## ✅ Evaluation Criteria
- **Structured coding pattern** → Proper folder structure, reusable components.  
- **Frontend knowledge & design sense** → UI clarity, responsiveness.  
- **Git usage**:  
  - Push project to **GitHub**.  
  - Be able to make modifications live and explain Git commands  
    (e.g., `commit`, `branch`, `push`, `pull`).  

---
