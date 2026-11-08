import discord
from discord.ext import commands
import random
import son
import os
intents = discord.I ntents.default()
intents.message_content = True
intents.members = True
bot = commands.Bot(command_prefix="t!", intents=intents)
DB_FILE = "database_tutien_ultimate.json"
CANH_GIOI : ["Luyén Khi KY", "Trdc Cd KY", "Kim Dan KY", "Nguyen Anh KY", "Héa Thlén KY", "Luyén HU KY", "Hcjp The
KY", "DO Kipp KY", "Dai La Kim Tier"]
# Quinn ly' Cd $6 dr lieu
def load_data() :
if os.path.exists(DB_FI LE) :
with open(DB_FI LE, "r", encoding="utf-8") as f :
return json.load(f)
return {"players": {}, "thien_dao_Iist": []}
def save_data(data) :
with open(DB_FI LE, "w", encoding="utf-8") as f:
json.dump(data,
f, ensure_ascii=False, indent=4)
def get_player(user_id, name) :
data = load_data()
uid = str(user_id)
if uid not in data["players"]:
data["players"][uid] = {
"name": name, "phe_phal . "ChLra chon (Dii ng t!dangky)" "canh_gioi_idx": 0,
"tu_vi": 0, "link thach": 500, "tong_mon": "Ten Tu", "hp_max": 100, "hl:)": 100, "atk": 10,
"tui_do": {"Tr£ic Cd Dan": 0, "Ph8 C8nh Dan": 0, "Thai Gian Sa": 0}
}
save_data(data)
return data["players"][uid]
def update_player(user_id, player_dict) :
data = load_data()
data["players"][str(user_id)] = player_dict
save_data(data)
# Kiem tra quylén Thief Dao (MY ring cho ngU6i duqc cap quylén)
def is_thien_dao() :
async def predicate(ctx) :
data = load_data()
is_creator = ctx.author.name == "H8i Nam TD" or await bot.is_owner(ctx.author)
is_sub_td =str(ctx.authorid) indata.get("thien_dao_list", [])
if not (is_creator or is_sub_td) :
await ctx.send("
**THI EN DAO UY NGHI EM!** Ban kh6ng c6 quyén can thiép v8o thin gi6i!")
return False
return True
return commands.check(predicate)
#
#
#
BANG LENH THI EN DAO (HAI NAM TD & PH() THI EN DAO)
@bot.command(name="td_capquyen")
async def td_capquyen(ctx, member: discord.Member) :
"""[Chi Hui Nam TD] Trao quylén hénh Thief Dao cho do hCru khéc"""
if ctx.authonname != "Hui Nam TD" and not await bot.is_owner(ctx.author) :
return await ctx.send(" Chi c6 Thief Dao Kh(3i Nguyen (Hai Nam TD) m6i c6 quylén phong thl8n!")
data = Ioad_data()
if "thien_dao_list" not in data: data["thien_dao_list"] = []
if str(member.id) not in data["thien_dao_list"]:
data["thien_dao_Iist"].append(str(member.id))
save_data(data)
await ctx.send(f" **Hui Nam TD** sic phong: Dao hCru **{member.name}** do thi ng hoa thénh Phi Thief
Dao, $6 hCru thl8n guy"én!")
else:
await ctx.send(" Ké nay v6'n 65 co chin trong dank such Thief Dao r6i.")
@bot.command(name="td_tuocquyen")
async def td_tuocquyen(ctx, member: discord.Member) :
"""[Chi Hui Nam TD] TLr6c quylén hénh Thief Dao"""
if ctx.authonname != "Hui Nam TD" and not await bot.is_owner(ctx.author) :
return await ctx.send(" Chi c6 Thief Dao Kh(3i Nguyen m6i c6 the phi" thl8n!")
data = Ioad_data()
if str(member.id) in data.get("thien_dao_list", []) :
data["thien_dao_Iist"].remove(str(member.id))
save_data(data)
await ctx.send(f"
**Hui Nam TD** ha Iénh: Day dog **{member.name}** xu6ng phém tran, tu'6c b6 hor n town
thl8n quylén!")
else:
await ctx.send("
NgLrE5i nay kh6ng phi Thief Dao.")
@bot.command(name="td_phat")
@is_thien_dao()
async def td_phat(ctx, member: discord.Member, so_luong: int) :
p = get_player(membenid, member.name)
p['tu_vi'] = max(0, p['tu_vi'] - so_Iuong)
update_player(member.id, p)
await ctx.send(f"
**Thief Dao** giving sé'm set ché'n nhié'p, phat **{member.name}** giém {so_Iuong} too vi!")
@bot.command(name="td_banthuong")
@is_thien_dao()
async def td_banthuong(ct><, member: discord.Member, so_luong: int) :
p = get_player(member.id, member.name)
p['linh_thach'] += so_luong
update_player(member.id, p)
await ctx.send(f"
**Thief Dao** réi Iinh VGban phurdc, ti ng **{member.name}** {so_Iuong} Linh Thach!")
@bot.command(name="td_thienha")
@is_thien_dao()
async def td_thienha(ctx, *, thong_bao: si r) .
embed = discord.Embed(title=" TI EN AM THI EN DAO", description=f"**{thong_bao}**", color=0xffd700)
await ctx.send(embed=embed)
#
#
#
BANG LENH NGUCJ1 DUNG & H6 1 CHI EU (COOLDOWN)
@bot.event
async def on_command_error(ctx, error) :
if isinstance(error, commands.CommandOnCooldown) :
await ctx.send(f"
**Dao hCru hay dlnh tom!** Chimu thdrc dang h6i, vui Ibng dpi them **{error.retry_after:.1f}**
giéy nCra.")
@bot.command(name="dangky")
async def dangky(ctx, phe: si r) :
p = get_player(ctx.author.id, ctx.author.name)
if p['phe_phai'] != "Chua chin (Dt mg t!dangky)": return await ctx.send(" Dao hCru do chcpn dddng di, kh6ng the
quay d`éu.")
phe : phe.lower()
if phe == "tier": p['phe_phai'] = "Tier Dao ", p['atk'] += 8
elif he == "ma": p['phe_phai'] = "Ma Dao ", p['hp_max'] += 60, p['hp'] += 60
else: return await ctx.send(" GO: `t!dangky tien` hoc `t!dangky ma"')
ul:)date_player(ctx.author.id, p)
await ctx.send(f" Chi c ming **{ctx.authonname}** do nhép dao **{p['phe_phai']}**!")
@bot.command(name="profile")
@commands.cooldown(1, 5, commands.BucketType.user) # H`6i chiu 5 giéy
async def profile(ctx) :
p = get_player(ctx.author.id, ctx.author.name)
embed = discord.Embed(title=f" Thé Tu Tier : {p['name']}", color=0x00ffcc)
embed.add_field(name="
Phe Phéi", value=p['phe_phai'], inline=True)
embed.add_field(name=" T6ng M6n", value=p['tong_mon'], inline=True)
embed.add_field(name=" Cénh Gigi", value=CANH_GI OI [p['canh_gioi_idx']], inline=True)
embed.add_field(name=" Tu vi", value=f"{p['tu_vi']} Diem", inline=True)
embed.add_field(name="
Linh Tha.ch", value=f"{p['Iinh_thach']} Vier", inline=True)
embed.add_field(name="
tui = ", ".join([f"{k} (x{v})" for k, v in p['tui_do'].items() if v > 0])
embed.add_field(name=" Toi D`6", value=tui if tui else "Trying trdn", inline=False)
await ct>(.send(embed=embed)
Sdrc Minh", value=f"HP: {p['hp']}/{p['hp_max']} | ATK: {p['atk']}", inline=True)
@bot.command(name="tulen")
@commands.cooldown(1, 15, commands.BucketType.user) # H`6i chiu 15 giéy ch6ng spam too vi
async def tulen(ctx) :
p = get_player(ctx.author.id, ctx.author.name)
diem : random.randint(20, 45)
p['tu_vi'] += diem
msg = f"
**{ctx.author.name}** rich Idly them **{diem}** too vi."
if random.random() < 0.25:
ki_ngo_list : [
("LLrcjm tali tilén rdi, durqc 300 Linh Thach!", 0, 300),
("Gap tom ma ni loan, giém 30 too vi!", -30, 0),
("Nhét duqc béu vat 'Thai Gian Sa' trong kg do!", 0, 0, "Thai Gian Sa")
]
kn = random.choice(ki_ngo_list)
p['tu_vi'] = max(0, p['tu_vi'] + kn[0])
p['linh_thach'] += kn[1]
if Ien(kn) > 3: p['tui do'][kn[3]] = p['tui_do'].get(kn[3], 0) + 1
msg += f"\n
**KI NGO:** {kn[0]}"
ul:)date_player(ctx.author.id, p)
await ct>(.send(msg)
@bot.command(name="hambicanh")
@commands.cooldown(1, 60, commands.BucketType.user) # H`6i chiu 1 phClt cho 1 l`én vuqt h`ém HQUC
async def hambicanh(ctx) :
""" Khém phi H`ém nguc Bi cénh Thai gian - vuqst ii him nghéo kié"m bi o vat"""
p = get_pla er(ctx.author.id, ctx.author.name)
if p['hp'] <= 20:
ctx.command.reset_cooldown(ctx) # Reset h`6i chiu né'u kh6ng do diéu kiln véo
return await ctx.send(" Trong thurdng! HP can du'6i 20 kh6ng the x6ng véo Bi cénh nguy f ir m, hay di ng `t!mua
Trdc Cd Dan` de h`6i mau.")
await ctx.send(f"
**{ctx.author.name}** kick hot trén phép, tin véo **H`ém Nguc Bi Cénh Thai Gian**...")
sat_thuong = random.randint(15, 35)
p['hp'] = max(1, p['hp'] - sat_thuong)
success = random.choice([True, False, True]) # 66% Ty In thi ng
if success:
iv_ran : random.randint(80, 150)
It_nhan = random.randint(100, 250)
p['tu_vi'] += tv_nhan
p['linh_thach'] += It_nhan
p['tui_do']["phé Cénh Dan'.'] = p['tui_do'].get("phé Cénh Dan", 0) + 1
await ctx.send(f"
**THANG LOI !** Ban tiu hao {sat_thuong} HP do phi vi t o trén th6i kh6ng, nhén nay
**{tv_nhan} Tu vi**, **{lt_nhan} Linh Tha.ch** vi 1 vin **Phi Cénh Dan*x!")
else:
await ctx.send(f"
**BAI TRAN!** Thai gian nghich Iu'u, ban bl can qui t tiu hao {sat_thuong} HP vi thoét ra tay
trying!")
ul:)date_player(ctx.author.id, p)
@bot.command(name="dotpha")
@commands.cooldown(1, 10, commands.BucketType.user)
async def dotpha(ctx) :
p = get_player(ctx.author.id, ctx.author.name)
Curr = p['canh_gioi_idx']
if Curr >= Ien(CANH_GI OI ) - 1: return await ctx.send(" Ban do dat dinh phong.")
can = (Curr + 1) * 200
if p['tu_vi'] < can: return await ctx.send(f" Thié'u too vi! C"an {can} dié§m.")
ty_le = max(80 - (Curr * 10), 10)
if p['tui_do'].get("ph8 Cénh Dan", 0) > 0:
p['tui_do']["phé Cénh Dan"] -= 1, ty_le += 20
dan_msg = " (Do can Ph8 Canh Dan +20% Ty In)"
else: dan_msg = ""
if random.randint(1, 100) <= ty_le:
p['canh_gioi_idx'] += 1, p['tu vi']
await ctx.send(f"
-= can, p['hp_max'] += 40, p['hp'] = p['hp_max'], p['atk'] += 12
**THANH CONG!** Dot phi Ion **{CANH_GIOI[p['canh_gioi_idx']]}**{dan_msg}!")
else:
phat = int(p['tu_vi'] * 0.2), p['tu_vi'] -= phat
await ctx.send(f"
**THA7T BAI !** Ten that {phat} too vi{dan_msg}!")
update_player(ctx.author.id, p)
@bot.command(name="shop")
async def shot:)(ctx):
embed = discord.Embed(title="
Linh Bi o Céc", color=0xff8800)
