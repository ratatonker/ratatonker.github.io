Notification.requestPermission()

function effective_hp(stats) {
    var armor = 100 / (100 + stats.def)
    var magic = 100 / (100 + stats.mdf)
    return ({
        phys: Math.round((stats.hp) / (armor * (1 - (stats.mit / 100)))),
        magic: Math.round((stats.hp) / (magic * (1 - (stats.mit / 100))))
    })
}

function getRat() {
    rat = {
        stats: {
            pwr: 0,
            pen: 0,
            pencent: 0,
            def: 72,
            mdf: 48,
            mit: 0,
            hp: 1880,
            mana: 1060,
            cdr: 0,
            ccr: 0,
            vamp: 0,
            crit: 0,
            atk: 0,
            base_atk: 1.4,
            speed: 0
        },
        itemnames: [],
        items: [],
        score: 0
    }

    return rat
}

function subsets(set, n) {
    if (!Number.isInteger(n) || n < 0 || n > set.size) return function* () { }();
    var subset = new Array(n),
        iterator = set.values();
    return (function* backtrack(index, remaining) {
        if (index === n) {
            yield subset.slice();
        } else {
            for (var i = 0; i < set.size; ++i) {
                subset[index] = iterator.next().value; /* Get first item */
                set.delete(subset[index]); /* Remove it */
                set.add(subset[index]); /* Insert it at the end */
                if (i <= remaining) {
                    yield* backtrack(index + 1, remaining - i);
                }
            }
        }
    })(0, set.size - n);
}

acorns = [
    {
        name: 'Evergreen Acorn',
        stats: {
            pwr: 35,
            speed: 20
        },
        passive: '7% hp/mana regen on when an ability hits a god',
        stat_calc: function (stats) {
            stats.hp += stats.hp * 0.1
        }
    }, {
        name: 'Thickbark Acorn',
        stats: {
            pwr: 25,
            speed: 20
        },
        passive: '3% hp regen on when an ability hits a god. steals protections on Flurry',
        stat_calc: function (stats) {
            stats.def += stats.def * 0.1
            stats.mdf += stats.mdf * 0.1
        }
    }, {
        name: 'Bristlebrush Acorn',
        stats: {
            pwr: 35,
            speed: 20,
            crit: 20
        },
        passive: 'dart now crits, deals 40% bonus damage, and gives rat lifesteal/attack speed',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Thistlethorn Acorn',
        stats: {
            pwr: 45,
            speed: 20
        },
        passive: 'acorn blast throws 5 acorns. it applies a 5% damage taken debuff on hit',
        stat_calc: function (stats) {
        }
    }
]

items = [
    {
        name: 'Transcendance',
        stats: {
            pwr: 35,
            mana: 1050,
            cdr: 10
        },
        passive: '',
        stat_calc: function (stats) {
            stats.pwr += stats.mana * .03
        }
    }, {
        name: 'Soul Eater',
        stats: {
            pwr: 40,
            vamp: 15,
            cdr: 10,
            pencent: 10,
        },
        passive: 'abilities heal for 20% damage dealt',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Heartseeker',
        stats: {
            pwr: 70,
            pencent: 10,
            mana: 200
        },
        passive: 'damage abilities deal up to 7% max hp as physical dmg',
        stat_calc: function (stats) {
            stats.pwr += stats.mana * .03
        }
    }, {
        name: 'Serrated Edge',
        stats: {
            pwr: 30,
            pencent: 20,
            vamp: 10,
            speed: 10
        },
        passive: 'If all 3 of your non-ultimate abilities are on cooldown, gain 40 Basic Attack Power and 10% Life Steal.',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Gladiators Shield',
        stats: {
            pwr: 25,
            hp: 200,
            def: 40,
            cdr: 10
        },
        passive: 'Any enemy god who is under 50% health takes bonus damage for your abilities equal to 15+2 per level bonus physical damage. Triggers only once per enemy per ability.',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Berserkers Shield',
        stats: {
            pwr: 40,
            atk: 20,
            def: 30,
            pencent: 10
        },
        passive: 'If you drop below 40% HP you become Berserk. Berserk provides 20 Physical Power and 20% Attack Speed. Lasts 5s, refreshes on if healed and then re-damaged.',
        stat_calc: function (stats) {
        }
    }, {
        name: 'The Sledge',
        stats: {
            pwr: 40,
            hp: 300,
            mana: 150,
            ccr: 20,
            def: 30,
            mdf: 30
        },
        passive: 'for each enemy within 55 Units, you gain 10 Magical and Physical Protections, stacking up to 3 times.',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Nemian Hide',
        stats: {
            def: 75,
            mana: 200
        },
        passive: 'Blocks up to 2 basic attacks',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Breastplate of Valor',
        stats: {
            def: 65,
            mana: 300,
            cdr: 20
        },
        passive: '',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Spectral Armor',
        stats: {
            def: 65,
            mana: 300,
            hp: 200
        },
        passive: 'Critical Strikes only deal 50% bonus damage to you instead of 100%.',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Contagion',
        stats: {
            def: 60,
            mana: 250,
            hp: 100
        },
        passive: 'Enemy gods within 55 units have their healing reduced by 25%. This does not stack with similar Auras.',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Sovereignty',
        stats: {
            def: 60,
            hp: 250
        },
        passive: 'Allied gods within 70 units have their Physical Protections increased by 15 and their HP5 increased by 35.',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Mystical Mail',
        stats: {
            def: 40,
            hp: 200,
            ccr: 20
        },
        passive: 'ALL enemies within 25 units are dealt 40 Magical Damage per second.',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Midgardian Mail',
        stats: {
            def: 40,
            hp: 300
        },
        passive: 'Enemies that successfully land a basic attack on you have their Movement Speed and Attack Speed reduced by 8% for 2 seconds. This effect can stack up to 3 times and can stack with other item slow effects.',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Emperors Armor',
        stats: {
            def: 40,
            hp: 250
        },
        passive: 'Damageable enemy structures within 55 units have their Attack Speed decreased by 30%. Damageable allied structures within 55 units have their Attack Speed increased by 40%.',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Genjis Guard',
        stats: {
            mdf: 70,
            hp: 150,
            cdr: 10
        },
        passive: 'When you take Magical Damage from Abilities your cooldowns are reduced by 3s. This can only occur once every 30s.',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Oni Hunters Garb',
        stats: {
            mdf: 60,
            hp: 100,
            ccr: 20,
            mit: 9
        },
        passive: 'For each enemy God within 55 units of you, you gain a stack of 3% damage mitigation. This caps at 3 stacks.',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Shoguns Kusari',
        stats: {
            mdf: 60,
            cdr: 10,
            ccr: 20
        },
        passive: 'Allied gods within 70 units have their Attack Speed increased by 25%.',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Shield of Regrowth',
        stats: {
            hp: 300,
            cdr: 10
        },
        passive: ' After healing yourself from an ability, you gain +40% movement speed for 4 seconds. This cannot occur more than once every 10 seconds.',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Mail of renewal',
        stats: {
            hp: 400,
            cdr: 10
        },
        passive: 'You gain 15% of your maximum Health and Mana over the next 5 seconds when you get a kill or assist against an enemy god or Objective.',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Gauntlet of Thebes',
        stats: {
            hp: 300,
            def: 60,
            mdf: 60
        },
        passive: 'Assists on a minion give 1 Stack and God kills and assists give 5 Stacks. Stacks provide 1 Physical and Magical Protection. At 50 stacks this item evolves, providing an Aura of 10 Physical Protection and 10 Magical Protection.',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Stone of Gaia',
        stats: {
            hp: 400
        },
        passive: 'If you are hit by a Knockup, Knockback, Pull, or Grab you gain 15% of your maximum Health over the next 5 seconds. Can only occur once every 45s - Regenerates 0.3 % of your max.Health every second.',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Frostbound Hammer',
        stats: {
            hp: 300,
            pwr: 25
        },
        passive: 'Enemies hit by your Basic Attacks have their Movement Speed reduced by 30% (20% for Ranged Basic Attacks) and have their Attack Speed reduced 15% for 1.25 seconds.',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Runeforged Hammer',
        stats: {
            hp: 200,
            pwr: 50
        },
        passive: 'Enemies take 15% increased damage from you if they are affected by Crowd Control. Does not include Knockbacks, Blinds, or Grabs.',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Blackthorn Hammer',
        stats: {
            hp: 350,
            pwr: 35,
            mana: 200,
            cdr: 10
        },
        passive: 'While over 25% Mana, you gain +10% Cooldown Reduction. While under 25% Mana, you gain +50 MP5.',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Spirit Robe',
        stats: {
            def: 40,
            mdf: 40,
            cdr: 10,
            ccr: 20
        },
        passive: 'You gain an additional 15% Damage Mitigation for 3s whenever you are hit with a hard Crowd Control Effect. This can only occur once every 15 seconds.',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Mantle of Discord',
        stats: {
            def: 60,
            mdf: 60,
            cdr: 10
        },
        passive: 'If you take damage below 30% health you unleash a shockwave that stuns all enemies within a range of 20 units for 1s and gain CC immunity for 1s. This effect cannot trigger more than once every 90s.',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Magis Cloak',
        stats: {
            def: 15,
            mdf: 15,
            hp: 300
        },
        passive: 'She will protect you from a single hard Crowd Control effect or Root once every 70 seconds. When this occurs, She bestows upon the owner 1s of Crowd Control Immunity.',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Hide Of the Urchin',
        stats: {
            def: 51,
            mdf: 51,
            hp: 250,
            mana: 250
        },
        passive: 'Provides a Health Shield that gains stacks every 2s. Shield only stacks if you have not taken or dealt damage in the last 5s. Each stack provides 10% of 100 Health +5 Per Level. The full shield will regenerate after 20 seconds.',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Lonos Mask',
        stats: {
            def: 35,
            mdf: 35,
            hp: 200,
            mit: 20,
            ccr: 20
        },
        passive: '-20% Damage Taken - 20 % Damage Dealt - 20 % Healing Done',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Void Shield',
        stats: {
            pwr: 20,
            def: 60,
            hp: 150,
            pencent: 15
        },
        passive: 'Enemy gods within 55 units have their Physical Protection reduced by 15%.',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Bulwark of Hope',
        stats: {
            mdf: 60,
            hp: 250,
            ccr: 20
        },
        passive: 'When you take damage and are below 30% Health, you gain a Shield with health equal to 150 +10 Per Player Level for 20s. Can only occur once every 60s.',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Pestilence',
        stats: {
            mdf: 80,
            hp: 200
        },
        passive: 'Enemy gods within 55 units have their healing reduced by 25%. This does not stack with similar Auras.',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Heartward Amulet',
        stats: {
            mdf: 70,
            hp: 250
        },
        passive: ' Allied gods within 70 units have their Magical Protections increased by 15 and their MP5 increased by 30.',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Talisman of Energy',
        stats: {
            mdf: 60,
            hp: 300
        },
        passive: 'Getting a kill or assist on enemies causes you and allies within 70 units to gain stacks of energy. Energy stacks provide 2% Movement Speed, 2% Attack Speed, and 10MP5 per stack. Lasts 10s and stacks up to 6 times.',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Runic Shield',
        stats: {
            pwr: 35,
            hp: 150,
            mdf: 50
        },
        passive: 'Enemy gods within 55 units have their Magical Power reduced by 40.',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Ancile',
        stats: {
            pwr: 40,
            cdr: 10,
            mdf: 50
        },
        passive: 'Enemy gods within 55 units have their Magical Power reduced by 40.',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Caducus Shield',
        stats: {
            pwr: 30,
            def: 35,
            mdf: 35,
            hp: 100
        },
        passive: 'Allied gods within 70 units have their Healing from abilities increased by 10%. If you have taken or dealt damage in the last 5s, their Healing is increased by an additional 15%. This does not stack with similar Auras.',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Deathbringer',
        stats: {
            pwr: 40,
            crit: 25
        },
        passive: 'Critical Strike damage is increased by 30%.',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Rage',
        stats: {
            pwr: 20,
            crit: 45
        },
        passive: '',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Malice',
        stats: {
            pwr: 20,
            crit: 25,
            cdr: 10
        },
        passive: ' Successfully Hitting an Enemy with a Critical Strike will subtract 3s from all of your abilities currently on Cooldown, except your Ultimate ability. This effect can only happen once every 5s.',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Stone Cutting Sword',
        stats: {
            pwr: 50,
            speed: 7,
            def: 30
        },
        passive: 'PASSIVE – Melee Basic Attacks decreases enemy Physical protections by 10, and increase your physical protection by 10 for 3s (max. 3 Stacks).',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Golden Blade',
        stats: {
            pwr: 30,
            speed: 10,
            atk: 20
        },
        passive: 'All Basic Attacks will also hit enemies within a 15 unit radius of the target for 50% of the damage to Gods, 75% damage to Minions and Jungle Camps',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Hastened Katana',
        stats: {
            pwr: 25,
            speed: 10,
            atk: 20
        },
        passive: 'Hitting an enemy with a Basic Attack grants Haste for 1s, causing you to be immune from Basic Attack Movement Penalty',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Ichaival',
        stats: {
            pwr: 30,
            atk: 30
        },
        passive: 'Every successful Basic Attack increases your Physical Power by 15 and reduces the attack speed of your opponent by 10% for 3s',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Arondight',
        stats: {
            pwr: 75,
            cdr: 10
        },
        passive: 'Hitting an enemy with a Basic Attack grants Haste for 1s, causing you to be immune from Basic Attack Movement Penalty',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Pridwen',
        stats: {
            def: 30,
            mdf: 30,
            cdr: 20
        },
        passive: 'When your Ultimate ability has finished casting, you gain a Shield equal to your Protections for 5s. When destroyed, by timing out or being depleted, it explodes and deals Magical damage equal to 50% of the Shield’s inital Health and slows targets by 25% for 3s. This can only occur once every 45 seconds',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Brawlers Beat Stick',
        stats: {
            pwr: 40,
            pen: 15
        },
        passive: 'Enemies hit by your Abilities have 40% reduced healing and regeneration for 8 seconds',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Jotunns Wrath',
        stats: {
            pwr: 40,
            pen: 10,
            cdr: 20,
            mana: 150
        },
        passive: '',
        stat_calc: function (stats) {
        }
    }, {
        name: 'The Crusher',
        stats: {
            pwr: 30,
            atk: 20,
            pen: 15
        },
        passive: 'Enemies hit by your damaging Abilities take an additional 20 Physical Damage + 15% of your Physical Power over 2s',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Winged Blade',
        stats: {
            hp: 300,
            ccr: 20,
            speed: 7
        },
        passive: 'When hit by a Slow, you are immune to Slows and your movement speed is increased by 20% for 4s. Only occurs once every 30 seconds',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Relic Dagger',
        stats: {
            hp: 300,
            cdr: 10,
            speed: 7
        },
        passive: 'Your relics receive 40s Cooldown Reduction',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Witchblade',
        stats: {
            hp: 250,
            cdr: 10,
            atk: 20,
            speed: 7
        },
        passive: 'Enemy gods within 55 units have their Attack Speed reduced by 20%',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Toxic Blade',
        stats: {
            hp: 100,
            pen: 15,
            atk: 30,
            speed: 7
        },
        passive: 'Enemies hit by your basic attacks gain 20% reduced healing, stacking up to 2 times and lasting 8s',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Executioner',
        stats: {
            pwr: 35,
            pencent: 21,
            atk: 25
        },
        passive: 'Basic Attacks against an enemy reduce your targets Physical Protection by 7% for 3 seconds(max. 3 Stacks)',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Qins Sais',
        stats: {
            pwr: 40,
            atk: 20
        },
        passive: 'On Basic Attack hits, deal Physical Damage equal to 3% of the targets maximum Health.If the target has over 2000 Health, the bonus damage scales up.This effect reaches a maximum of 5% of the targets Maximum Health at 2750 Health',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Asi',
        stats: {
            pwr: 20,
            pen: 20,
            atk: 25,
            vamp: 20
        },
        passive: 'If you drop below 35% Health, you gain an additional 30% Physical Lifesteal for 5 seconds. Can only occur once every 15 seconds.',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Atalantas Bow',
        stats: {
            pwr: 25,
            pencent: 20,
            atk: 30
        },
        passive: 'If you receive a kill or assist on an Enemy God you gain Atalantas Agility for 10s.This effect increases your Attack Speed by 20% and decreases the movement penalty for attacking, backpedaling, and strafing by 50%',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Silverbranch Bow',
        stats: {
            pwr: 30,
            pencent: 10,
            atk: 35
        },
        passive: 'For each 0.02 Attack Speed you go over cap you gain 2 Physical Power',
        stat_calc: function (stats) {
            attack_speed = stats.base_atk + (stats.base_atk * (stats.atk / 100))
            if (attack_speed > 2.5) {
                stats.pwr += Math.round((attack_speed - 2.5) / 0.02)
            }
        }
    }, {
        name: 'Shadowsteel Shuriken',
        stats: {
            pwr: 20,
            crit: 20,
            atk: 10
        },
        passive: 'Enemies hit by your critical strikes have 40% reduced healing and regeneration for 8 seconds',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Poisoned Star',
        stats: {
            pwr: 35,
            crit: 15,
            atk: 10
        },
        passive: 'Critical hits on enemy gods afflict them with poison for 2s. This poison slows them by 15% and reduces their damage output by 15%',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Wind Demon',
        stats: {
            pwr: 25,
            crit: 15,
            atk: 30,
            speed: 20,
            pencent: 10
        },
        passive: 'Critical hits on enemy gods afflict them with poison for 2s. This poison slows them by 15% and reduces their damage output by 15%',
        stat_calc: function (stats) {
        }
    }, {
        name: 'Titans Bane',
        stats: {
            pwr: 40,
            pencent: 20
        },
        passive: 'Your first ability cast gains 20% Physical Penetration. This can only occur once every 10 seconds',
        stat_calc: function (stats) {
        }
    },
]

function itemSort(a, b) {
    return (a.name > b.name)
}

items.sort((a, b) => (a.name > b.name) - (a.name < b.name))
console.log(items)
function getItem(n) {
    if (n == null) { return null }
    out = null
    items.forEach(function (i) {
        if (i.name.trim().localeCompare(n.trim()) == 0) {
            console.log('found')
            out = i
        }
    })
    return (out)
}

Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)


var app = new Vue({
    el: "#app",
    data: {
        alert: false,
        gen: false,
        rat_list: [],
        saved: [],
        charts: [],
        preselect: ['auto', 'auto', 'auto', 'auto', 'auto'],
        itemdata: items,
        random: false,
        use_acorns: true,
        lonos: true,
        pwr_cap: 400,
        enemy_armor: 100,
        ability: 66,
        percent: 0,
        number: 6,
        power: 5,
        def: 5,
        mdf: 5,
        util: 5
    },
    methods: {
        save: function (rat, event) {
            if (this.saved.indexOf(rat) >= 0) {
                console.log('rat already saved')
                return
            }
            this.saved.push(rat)
            if (localStorage.getItem('saved_rats')) {
                object = JSON.parse(localStorage.getItem('saved_rats'))
                already = false
                object.rats.forEach(function (r) {
                    if (r.itemnames == rat.itemnames)
                        already = true
                })
                if (already) { console.log('rat already saved'); return }
                object.rats.push(rat)
                localStorage.setItem('saved_rats', JSON.stringify(object))
            } else {
                localStorage.setItem('saved_rats', JSON.stringify({ rats: [rat] }))
            }

        },
        search: async function (event) {
            this.gen = true
            app.$forceUpdate()
            await this.$forceUpdate()
            console.log(this.preselect)
            preset_items = []
            this.preselect.forEach(element => {
                if (getItem(element)) {
                    preset_items.push(getItem(element))
                }
            })
            console.log(preset_items)

            adjusted_items = items
            adjusted_items = adjusted_items.filter((el) => !preset_items.includes(el))

            if (this.lonos) {
                adjusted_items = adjusted_items.filter((el) => ![getItem('Lonos Mask')].includes(el))
            }

            let rat_limit = this.number
            def = this.def
            mdf = this.mdf
            power = this.power
            util = this.util
            random = this.random
            enemy_armor = this.enemy_armor
            pwr_cap = this.pwr_cap
            ability = this.ability
            use_acorns = this.use_acorns

            sort_criteria = function (a, b) {
                if (this.random) {
                    return (Math.random() - 0.9999993)
                }

                a_ehp = effective_hp(a.stats)
                a_avg = (a_ehp.phys + a_ehp.magic) / 2
                b_ehp = effective_hp(b.stats)
                b_avg = (b_ehp.phys + b_ehp.magic) / 2

                a_phys = (a_ehp.phys * 0.005)
                b_phys = (b_ehp.phys) * 0.005
                a_magic = (a_ehp.magic) * 0.005
                b_magic = (b_ehp.magic) * 0.005

                cap_power = Math.min(pwr_cap, a.stats.pwr)
                cap_percent = Math.min(40, a.stats.pencent)
                cap_pen = Math.min(50, a.stats.pen)
                cap_crit = Math.min(100, a.stats.crit)
                cap_cdr = Math.min(40, a.stats.cdr)
                cap_ccr = Math.min(40, a.stats.ccr)

                enemy_mit = (100 / (100 + Math.max(0, (this.enemy_armor * (1 - cap_percent * 0.01) - cap_pen))))
                a_power = (cap_power / 4)
                a_power += ((cap_power / 4) * cap_crit * 0.01) * ((100 - ability) * 0.1)
                a_power += ((cap_power / 4) * a.stats.atk * 0.01) * ((100 - ability) * 0.08)
                a_power += ((cap_power / 4) * cap_cdr * 0.01) * ((ability) * 0.1)
                a_power = a_power * enemy_mit

                a_util = (a.stats.vamp + a.stats.cdr + cap_ccr + a.stats.speed) / 3
                a.score = Math.round((a_phys * this.def + a_magic * this.mdf + a_power * this.power + a_util * this.util) / (1 + this.def + this.mdf + this.power + this.util))



                if (!b.score) {

                    cap_power = Math.min(pwr_cap, b.stats.pwr)
                    cap_percent = Math.min(40, b.stats.pencent)
                    cap_pen = Math.min(50, b.stats.pen)
                    cap_crit = Math.min(100, b.stats.crit)
                    cap_cdr = Math.min(40, b.stats.cdr)
                    cap_ccr = Math.min(40, b.stats.ccr)

                    enemy_mit = (100 / (100 + Math.max(0, (this.enemy_armor * (1 - cap_percent * 0.01) - cap_pen))))
                    b_power = (cap_power / 4)
                    b_power += ((cap_power / 4) * cap_crit * 0.01) * ((100 - ability) * 0.1)
                    b_power += ((cap_power / 4) * b.stats.atk * 0.01) * ((100 - ability) * 0.08)
                    b_power += ((cap_power / 4) * cap_cdr * 0.01) * ((ability) * 0.1)
                    b_power = a_power * enemy_mit
                    b_util = (b.stats.vamp + b.stats.cdr + cap_ccr + b.stats.speed) / 3

                    b.score = Math.round((b_phys * this.def + b_magic * this.mdf + b_power * this.power + b_util * this.util) / (1 + this.def + this.mdf + this.power + this.util))
                }

                return (a.score - b.score)
            }

            console.clear()
            console.log('started ')
            console.log(this.power)
            console.log(this.def)
            rats = []
            console.log(items.length + ' items loaded')
            count = 0
            item_len = 5
            use_acorns = this.use_acorns
            if (!this.use_acorns) { item_len = 6 }
            console.log(item_len)

            working_items = subsets(new Set(adjusted_items), item_len - preset_items.length)
            for (var set of working_items) {

                acorns.forEach(function (acorn) {
                    rat = getRat()
                    if (this.use_acorns) {
                        rat.items.push(acorn)
                    }
                    preset_items.forEach(element => {
                        rat.items.push(element)
                    })
                    for (var e of set) {
                        rat.items.push(e)
                    }
                    rat.items.forEach(function (i) {
                        rat.stats.pwr += i.stats.pwr ? i.stats.pwr : 0
                        rat.stats.pen += i.stats.pen ? i.stats.pen : 0
                        rat.stats.pencent += i.stats.pencent ? i.stats.pencent : 0
                        rat.stats.def += i.stats.def ? i.stats.def : 0
                        rat.stats.mdf += i.stats.mdf ? i.stats.mdf : 0
                        rat.stats.mit += i.stats.mit ? i.stats.mit : 0
                        rat.stats.hp += i.stats.hp ? i.stats.hp : 0
                        rat.stats.mana += i.stats.mana ? i.stats.mana : 0
                        rat.stats.cdr += i.stats.cdr ? i.stats.cdr : 0
                        rat.stats.ccr += i.stats.ccr ? i.stats.ccr : 0
                        rat.stats.vamp += i.stats.vamp ? i.stats.vamp : 0
                        rat.stats.crit += i.stats.crit ? i.stats.crit : 0
                        rat.stats.atk += i.stats.atk ? i.stats.atk : 0
                        rat.stats.speed += i.stats.speed ? i.stats.speed : 0
                    })
                    rat.items.forEach(function (i) {
                        i.stat_calc(rat.stats)
                    })
                    itemz = []
                    rat.items.forEach(function (i) {
                        itemz.push({
                            name: i.name,
                            passive: i.passive,
                            stats: i.stats
                        })
                        rat.itemnames.push(i.name)
                    })
                    rat.items = itemz
                    rat.effective_hp = effective_hp(rat.stats)

                    if (rats.length > rat_limit - 1) {
                        if (sort_criteria(rat, rats[rats.length - 1]) > 0) {
                            rats.shift()
                            rats.push(rat)
                        }
                    } else {
                        rats.push(rat)
                    }
                    count += 1
                })
                if (count % 1000000 == 0) {
                    console.clear()
                    console.log('permutations: ' + Math.round(count / 1000000) + 'M')
                    this.percent = Math.round(100 - (((28000000 - count) / 28000000) * 100))
                }
            }


            console.log('done, ' + count + ' rats generated \n ---------------\n ---------------')

            rats.sort(sort_criteria)
            rats.reverse()
            console.log(rats)
            console.log(rats.length)
            rats.forEach((r) => {
                r.chart = {
                    options: {
                        dropShadow: {
                            enabled: true,
                            top: 0,
                            left: 0,
                            blur: 3,
                            opacity: 0.5
                        },
                        fill: {
                            opacity: 0.5,
                            colors: ['#F3969A']
                        },
                        stroke: {
                            show: true,
                            width: 2,
                            colors: ['#F3969A'],
                            dashArray: 0
                        },
                        markers: {
                            size: 3,
                            colors: ['#F3969A'],
                        },
                        chart: {
                            id: r.score,
                            toolbar: {
                                show: true,
                            }
                        },
                        xaxis: {
                            categories: ['pwr', 'def', 'mdf', 'crit', 'vamp', 'pen']
                        }
                    },
                    series: [{
                        name: '',
                        color: '#F3969A',
                        data: [r.stats.pwr, r.stats.def, r.stats.mdf, 3.5 * r.stats.crit, 3 * r.stats.vamp, 3 * (r.stats.pen + r.stats.pencent)]
                    }]
                }
                console.log(r.chart)
            })
            this.rat_list = rats
            not = new Notification('Rat builds loaded!')
            this.alert = true
            this.gen = false
        }
    }
})