# Install if needed
# pip install nba_api pandas

from nba_api.stats.static import players
from nba_api.stats.endpoints import shotchartdetail
import pandas as pd

# Function to get shot chart data and export to CSV
def get_shot_data(player_full_name):
    # Get list of all players
    player_dictionary = players.get_players()

    # Find the player info
    player_info = [p for p in player_dictionary if p['full_name'] == player_full_name][0]
    player_id = player_info['id']
    print(f"Found {player_full_name} (ID: {player_id})")

    # Query the ShotChartDetail endpoint
    player_shotlog = shotchartdetail.ShotChartDetail(
        team_id=0,                      # 0 = all teams
        player_id=player_id,            # player ID we just found
        context_measure_simple="FGA",   # Field Goals Attempted (FGM + FGA)
        season_type_all_star=["Regular Season", "Playoffs"]  # filter to real games
    )

    # Convert to DataFrame
    player_df = player_shotlog.get_data_frames()[0]

    # Save CSV
    file_path = f"./{player_full_name.replace(' ', '_')}_shots.csv"
    player_df.to_csv(file_path, index=False)
    print(f"Saved shot data to {file_path}")

    # Return a preview
    return player_df.head(10)


# -------------------------------
# Example usage
# -------------------------------
lebron_data = get_shot_data("LeBron James")
print(lebron_data)

kobe_data = get_shot_data("Kobe Bryant")
print(kobe_data)
