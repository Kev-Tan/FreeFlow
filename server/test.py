from flask import Flask, request, jsonify
from flask_cors import CORS
from nba_api.stats.endpoints import playercareerstats, shotchartdetail
from nba_api.stats.static import players

app = Flask(__name__)
CORS(app)

@app.route('/player-career-stats/', methods=['GET'])
def get_player_career_stats():
    player_name = request.args.get('player_name')
    
    if not player_name:
        return jsonify({"error": "Missing 'player_name' parameter"}), 400

    # Search for player
    matched_players = players.find_players_by_full_name(player_name)
    if not matched_players:
        return jsonify({"error": "Player not found"}), 404

    player_info = matched_players[0]
    player_id = player_info["id"]
    full_name = player_info["full_name"]

    try:
        # --- Career stats ---
        career = playercareerstats.PlayerCareerStats(player_id=player_id)
        df_career = career.get_data_frames()[0]
        career_data = df_career.to_dict(orient="records")

        # --- Shot chart ---
        shots = shotchartdetail.ShotChartDetail(
            team_id=0,                   # 0 = all teams
            player_id=player_id,
            season_nullable="2024-25",   # ⚠️ must specify a season
            season_type_all_star="Regular Season",
            context_measure_simple="FGA"
        )
        df_shots = shots.shot_chart_detail.get_data_frame()
        shots_data = df_shots.to_dict(orient="records")

        # --- Print shot chart in console ---
        print(f"Shot Chart for {full_name} ({player_id})")
        print(df_shots.head(10))  # show first 10 rows nicely formatted

        return jsonify({
            "player_id": player_id,
            "player_name": full_name,
            "career_stats": career_data,
            "shot_chart": shots_data
        })

    except Exception as e:
        return jsonify({"error": f"Failed to fetch stats: {str(e)}"}), 500


if __name__ == '__main__':
    app.run(debug=True)
