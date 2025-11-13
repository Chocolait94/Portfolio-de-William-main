//  Pokémon Pokedex App
let apiLink = "https://pokebuildapi.fr/api/v1/pokemon";

//  Sélectionner l'élément pokedex
const pokedex = document.getElementById('pokedex');

// Noms des Pokémon en français
const pokemonNamesFR = {
    1: "Bulbizarre", 2: "Herbizarre", 3: "Florizarre", 4: "Salamèche", 5: "Reptincel",
    6: "Dracaufeu", 7: "Carapuce", 8: "Carabaffe", 9: "Tortank", 10: "Chenipan",
    11: "Chrysacier", 12: "Papilusion", 13: "Aspicot", 14: "Coconfort", 15: "Dardargnan",
    16: "Roucool", 17: "Roucoups", 18: "Roucarnage", 19: "Rattata", 20: "Rattatac",
    21: "Piafabec", 22: "Rapasdepic", 23: "Abo", 24: "Arbok", 25: "Pikachu",
    26: "Raichu", 27: "Sabelette", 28: "Sablaireau", 29: "Nidoran♀", 30: "Nidorina",
    31: "Nidoqueen", 32: "Nidoran♂", 33: "Nidorino", 34: "Nidoking", 35: "Mélofée",
    36: "Mélodelfe", 37: "Goupix", 38: "Feunard", 39: "Rondoudou", 40: "Grodoudou",
    41: "Nosferapti", 42: "Nosferalto", 43: "Mystherbe", 44: "Ortide", 45: "Rafflesia",
    46: "Paras", 47: "Parasect", 48: "Mimitoss", 49: "Aéromite", 50: "Taupiqueur",
    51: "Triopikeur", 52: "Miaouss", 53: "Persian", 54: "Psykokwak", 55: "Akwakwak",
    56: "Férosinge", 57: "Colossinge", 58: "Caninos", 59: "Arcanin", 60: "Ptitard",
    61: "Têtarte", 62: "Tartard", 63: "Abra", 64: "Kadabra", 65: "Alakazam",
    66: "Machoc", 67: "Machopeur", 68: "Mackogneur", 69: "Chétiflor", 70: "Boustiflor",
    71: "Empiflor", 72: "Tentacool", 73: "Tentacruel", 74: "Racaillou", 75: "Gravalanch",
    76: "Grolem", 77: "Ponyta", 78: "Galopa", 79: "Ramoloss", 80: "Flagadoss",
    81: "Magnéti", 82: "Magnéton", 83: "Canarticho", 84: "Doduo", 85: "Dodrio",
    86: "Otaria", 87: "Lamantine", 88: "Tadmorv", 89: "Grotadmorv", 90: "Kokiyas",
    91: "Crustabri", 92: "Fantominus", 93: "Spectrum", 94: "Ectoplasma", 95: "Onix",
    96: "Soporifik", 97: "Hypnomade", 98: "Krabby", 99: "Krabboss", 100: "Voltorbe",
    101: "Électrode", 102: "Noeunoeuf", 103: "Noadkoko", 104: "Osselait", 105: "Ossatueur",
    106: "Kicklee", 107: "Tygnon", 108: "Excelangue", 109: "Smogo", 110: "Smogogo",
    111: "Rhinocorne", 112: "Rhinoféros", 113: "Leveinard", 114: "Saquedeneu", 115: "Kangourex",
    116: "Hypotrempe", 117: "Hypocéan", 118: "Poissirène", 119: "Poissoroy", 120: "Stari",
    121: "Staross", 122: "M.Mime", 123: "Insécateur", 124: "Lippoutou", 125: "Élektek",
    126: "Magmar", 127: "Scarabrute", 128: "Tauros", 129: "Magicarpe", 130: "Léviator",
    131: "Lokhlass", 132: "Métamorph", 133: "Évoli", 134: "Aquali", 135: "Voltali",
    136: "Pyroli", 137: "Porygon", 138: "Amonita", 139: "Amonistar", 140: "Kabuto",
    141: "Kabutops", 142: "Ptéra", 143: "Ronflex", 144: "Artikodin", 145: "Électhor",
    146: "Sulfura", 147: "Minidraco", 148: "Draco", 149: "Dracolosse", 150: "Mewtwo"
};

const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 150; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: pokemonNamesFR[result.id] || result.name,
            id: result.id,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            types: result.types.map((type) => type.type.name),
            stats: result.stats,
            weight: result.weight,
            height: result.height
        }));
        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon
        .map(
            (pokeman) => `
        <div class="pokemon-wrapper" data-id="${pokeman.id}">
            <div class="pokemon-id">#${pokeman.id.toString().padStart(3, '0')}</div>
            
            <!-- COLONNE GAUCHE : IMAGE -->
            <div class="pokemon-left-section">
                <h3 class="pokemon-name">${pokeman.name}</h3>
                <div class="pokemon-img-container">
                    <img class="pokemon-img" src="${pokeman.image}" alt="${pokeman.name}"/>
                </div>
            </div>
            
            <!-- COLONNE DROITE : INFORMATIONS -->
            <div class="pokemon-right-section">
                <!-- Types -->
                <div class="pokemon-types">
                    ${pokeman.types.map(type => `<span class="type-badge type-${type}">${translateType(type)}</span>`).join('')}
                </div>
                
                <!-- Stats -->
                <div class="stats-wrapper">
                    <h4 class="section-title">Statistiques</h4>
                    ${pokeman.stats.map(stat => `
                        <div class="stat-item">
                            <span class="stat-label">${translateStat(stat.stat.name)}</span>
                            <span class="stat-value">${stat.base_stat}</span>
                        </div>
                        <div class="stat-bar">
                            <div class="stat-bar-fill" style="width: ${Math.min(stat.base_stat, 255) / 255 * 100}%"></div>
                        </div>
                    `).join('')}
                </div>
                
                <!-- Résistances -->
                <div class="resistances-wrapper">
                    <h4 class="section-title">Résistances</h4>
                    <div class="resistance-item">Chargement des résistances...</div>
                </div>
                
                <!-- Évolutions -->
                <div class="evolutions-wrapper">
                    <h4 class="section-title">Évolutions</h4>
                    <div class="evolution-item">Chargement des évolutions...</div>
                </div>
            </div>
        </div>
    `
        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;
    
    // Ajouter les événements de clic
    addPokemonClickEvents();
    
    // Charger les détails supplémentaires pour chaque Pokémon
    pokemon.forEach(pokeman => {
        loadPokemonDetails(pokeman.id);
    });
};

// Fonction pour charger les détails supplémentaires (résistances, évolutions)
const loadPokemonDetails = async (pokemonId) => {
    try {
        // Récupérer les données de l'espèce pour les évolutions
        const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
        const speciesData = await speciesResponse.json();
        
        // Récupérer la chaîne d'évolution
        const evolutionResponse = await fetch(speciesData.evolution_chain.url);
        const evolutionData = await evolutionResponse.json();
        
        // Récupérer les types pour les résistances
        const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        const pokemonData = await pokemonResponse.json();
        
        // Mettre à jour les évolutions
        updateEvolutions(pokemonId, evolutionData);
        
        // Mettre à jour les résistances
        updateResistances(pokemonId, pokemonData.types);
        
    } catch (error) {
        console.error(`Erreur lors du chargement des détails du Pokémon ${pokemonId}:`, error);
    }
};

// Fonction pour mettre à jour les évolutions
const updateEvolutions = (pokemonId, evolutionData) => {
    const card = document.querySelector(`.pokemon-wrapper[data-id="${pokemonId}"]`);
    if (!card) return;
    
    const evolutionsWrapper = card.querySelector('.evolutions-wrapper');
    const evolutions = [];
    
    // Parcourir la chaîne d'évolution
    let currentEvolution = evolutionData.chain;
    
    while (currentEvolution) {
        const speciesId = currentEvolution.species.url.split('/').slice(-2, -1)[0];
        const speciesName = pokemonNamesFR[speciesId] || currentEvolution.species.name;
        evolutions.push({ name: speciesName, id: speciesId });
        
        currentEvolution = currentEvolution.evolves_to[0];
    }
    
    if (evolutions.length > 1) {
        evolutionsWrapper.innerHTML = `
            <h4 class="section-title">Évolutions</h4>
            ${evolutions.map((evo, index) => `
                <div class="evolution-item">
                    ${index > 0 ? '➜ ' : ''}${evo.name} (ID: ${evo.id})
                </div>
            `).join('')}
        `;
    } else {
        evolutionsWrapper.innerHTML = `
            <h4 class="section-title">Évolutions</h4>
            <div class="evolution-item">Pas d'évolution</div>
        `;
    }
};

// Fonction pour mettre à jour les résistances
const updateResistances = async (pokemonId, types) => {
    const card = document.querySelector(`.pokemon-wrapper[data-id="${pokemonId}"]`);
    if (!card) return;
    
    const resistancesWrapper = card.querySelector('.resistances-wrapper');
    const resistances = {};
    
    try {
        // Pour chaque type du Pokémon
        for (const typeObj of types) {
            const typeResponse = await fetch(typeObj.type.url);
            const typeData = await typeResponse.json();
            
            // Calculer les multiplicateurs de dégâts
            typeData.damage_relations.double_damage_from.forEach(type => {
                resistances[type.name] = (resistances[type.name] || 1) * 2;
            });
            
            typeData.damage_relations.half_damage_from.forEach(type => {
                resistances[type.name] = (resistances[type.name] || 1) * 0.5;
            });
            
            typeData.damage_relations.no_damage_from.forEach(type => {
                resistances[type.name] = 0;
            });
        }
        
        // Trier par vulnérabilité (du plus vulnérable au plus résistant)
        const sortedResistances = Object.entries(resistances).sort((a, b) => b[1] - a[1]);
        
        if (sortedResistances.length > 0) {
            resistancesWrapper.innerHTML = `
                <h4 class="section-title">Résistances</h4>
                ${sortedResistances.map(([type, multiplier]) => {
                    let label = '';
                    let emoji = '';
                    if (multiplier === 0) {
                        label = 'immunisé';
                        emoji = '🛡️';
                    } else if (multiplier === 0.25) {
                        label = 'très résistant (0.25x)';
                        emoji = '💚';
                    } else if (multiplier === 0.5) {
                        label = 'résistant (0.5x)';
                        emoji = '💙';
                    } else if (multiplier === 2) {
                        label = 'vulnérable (2x)';
                        emoji = '🔶';
                    } else if (multiplier === 4) {
                        label = 'très vulnérable (4x)';
                        emoji = '🔴';
                    } else {
                        label = 'neutre (1x)';
                        emoji = '⚪';
                    }
                    
                    return `
                        <div class="resistance-item">
                            ${emoji} <strong>${translateType(type)}</strong>: ${label}
                        </div>
                    `;
                }).join('')}
            `;
        } else {
            resistancesWrapper.innerHTML = `
                <h4 class="section-title">Résistances</h4>
                <div class="resistance-item">⚪ Toutes résistances neutres</div>
            `;
        }
        
    } catch (error) {
        console.error(`Erreur lors du chargement des résistances:`, error);
        resistancesWrapper.innerHTML = `
            <h4 class="section-title">Résistances</h4>
            <div class="resistance-item">❌ Erreur de chargement</div>
        `;
    }
};

// Fonction pour ajouter les événements de clic
const addPokemonClickEvents = () => {
    const pokemonCards = document.querySelectorAll('.pokemon-wrapper');
    pokemonCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('expanded');
        });
    });
};

// Traduction des types en français
const translateType = (type) => {
    const translations = {
        normal: 'Normal',
        fire: 'Feu',
        water: 'Eau',
        grass: 'Plante',
        electric: 'Électrik',
        ice: 'Glace',
        fighting: 'Combat',
        poison: 'Poison',
        ground: 'Sol',
        flying: 'Vol',
        psychic: 'Psy',
        bug: 'Insecte',
        rock: 'Roche',
        ghost: 'Spectre',
        dragon: 'Dragon',
        dark: 'Ténèbres',
        steel: 'Acier',
        fairy: 'Fée'
    };
    return translations[type] || type;
};

// Traduction des stats en français
const translateStat = (stat) => {
    const translations = {
        hp: 'PV',
        attack: 'Attaque',
        defense: 'Défense',
        'special-attack': 'Att. Spé.',
        'special-defense': 'Déf. Spé.',
        speed: 'Vitesse'
    };
    return translations[stat] || stat;
};

// Initialiser le Pokédex
fetchPokemon();