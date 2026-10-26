/*:
 * @target MZ
 * @plugindesc v6.4.1 Патч окклюзии света (стабильный релиз).
 * @author Neuron Project
 *
 * @param _sep_main
 * @text ========== ОСНОВНЫЕ ==========
 * @desc
 * @default
 *
 * @param preset
 * @text Пресет теней
 * @desc Готовый набор настроек. Меняет форму и мягкость теней.
 * @type select
 * @option Баланс (Рекомендуется)
 * @value balanced
 * @option Крупные (Тяжелые, угловатые)
 * @value chunky
 * @option Резкие (Для особых зон)
 * @value sharp
 * @default balanced
 *
 * @param presetOverridesEditor
 * @text Пресет главнее редактора
 * @desc Если ВКЛ, пресет фиксирует 4 параметра (радиус, лучи, мягкость, маска) независимо от редактора.
 * @type boolean
 * @default true
 *
 * @param wallRegion
 * @text Регион стен
 * @desc ID региона, который блокирует свет. По умолчанию 1. Если не уверены — не меняйте.
 * @type number
 * @min 1
 * @default 1
 *
 * @param sharpRegion
 * @text Регион «резких теней»
 * @desc ID региона, при входе в который тени становятся четкими. 0 — выключено.
 * @type number
 * @min 0
 * @default 2
 *
 * @param _sep_fade
 * @text ========== ЗАТУХАНИЕ СВЕТА ==========
 * @desc
 * @default
 *
 * @param fadeUnseenSources
 * @text Тьма поглощает свет
 * @desc Если включено, источники света за стенами будут плавно гаснуть. Экономит ресурсы. В зоне резких теней всегда включено.
 * @type boolean
 * @default true
 *
 * @param fadeInDuration
 * @text Скорость появления (сек)
 * @desc За сколько секунд лампа плавно загорается, когда вы выходите на нее.
 * @type number
 * @decimals 2
 * @default 1.6
 *
 * @param fadeOutDuration
 * @text Скорость затухания (сек)
 * @desc За сколько секунд лампа гаснет, когда вы уходите.
 * @type number
 * @decimals 2
 * @default 1.6
 *
 * @param visibilityHysteresis
 * @text Задержка смены видимости
 * @desc Сколько кадров свет должен быть скрыт/видим, чтобы начать гаснуть/загораться. Защита от мерцания.
 * @type number
 * @min 1
 * @default 9
 *
 * @param _sep_perf
 * @text ========== ПРОИЗВОДИТЕЛЬНОСТЬ ==========
 * @desc
 * @default
 *
 * @param sourceCullRadius
 * @text Дальность отсева света
 * @desc На каком расстоянии (в тайлах) от игрока свет выключается полностью. Должен быть больше «Области окклюзии».
 * @type number
 * @min 2
 * @default 20
 *
 * @param maxOcclusionRadius
 * @text Область окклюзии (тайлы)
 * @desc Максимальный радиус расчета теней (в тайлах). Увеличение увеличивает нагрузку.
 * @type number
 * @min 1
 * @default 16
 *
 * @param raySamples
 * @text Точность видимости
 * @desc Влияет на точность видимости источников и cornerGlow. На форму теней не влияет. 6 — оптимум. 8 — +10% FPS без визуальной разницы.
 * @type number
 * @min 2
 * @default 6
 *
 * @param maskScale
 * @text Разрешение маски
 * @desc Качество картинки теней. 0.4 — идеальный баланс. 0.5+ заметно нагружает видеокарту.
 * @type number
 * @min 0.25
 * @max 1.0
 * @decimals 2
 * @default 0.4
 *
 * @param maxCellCount
 * @text Лимит памяти теней
 * @desc Сколько готовых теней хранить в памяти. 128 — безопасный баланс между памятью и пересчетами.
 * @type number
 * @min 16
 * @max 512
 * @default 128
 *
 * @param _sep_atmo
 * @text ========== АТМОСФЕРА И ОБЪЕМ ==========
 * @desc
 * @default
 *
 * @param edgeSoftness
 * @text Мягкость краев
 * @desc Управляет размытием геометрических силуэтов. 0.6 — идеально для нашего стиля.
 * @type number
 * @min 0
 * @max 1
 * @decimals 2
 * @default 0.6
 *
 * @param shadowOffset
 * @text Смещение тени (0..0.5)
 * @desc Сдвигает начало тени от стены к источнику. Закрывает зазор между спрайтом и тенью. Максимум 0.5 (выше — выворачивание).
 * @type number
 * @min 0
 * @max 0.5
 * @decimals 2
 * @default 0.5
 *
 * @param wallShadowFade
 * @text Вертикальное затухание
 * @desc Свет затухает к верху стены. Создает иллюзию 3D-объема.
 * @type number
 * @min 0
 * @max 1
 * @decimals 2
 * @default 0.6
 *
 * @param wallBottomFade
 * @text Градиент низа стены
 * @desc Свет «протекает» на нижнюю часть стены. Убирает эффект черного квадрата.
 * @type number
 * @min 0
 * @max 1
 * @decimals 2
 * @default 0.2
 *
 * @param wallBottomFadeHeight
 * @text Высота градиента низа
 * @desc Насколько высоко свет поднимается по стене. 0.33 — нижняя треть тайла.
 * @type number
 * @min 0.1
 * @max 0.9
 * @decimals 2
 * @default 0.33
 *
 * @param facadeLightAlpha
 * @text Свет на фасаде стен
 * @desc Яркость освещения передней грани стены. 0.4 — мягкий, реалистичный свет.
 * @type number
 * @min 0
 * @max 1
 * @decimals 2
 * @default 0.4
 *
 * @param cornerBleed
 * @text Огибание углов: стены
 * @desc Подсветка стен у самого пола. 0.05 — едва заметный, безопасный уровень.
 * @type number
 * @min 0
 * @max 1
 * @decimals 2
 * @default 0.05
 *
 * @param cornerGlow
 * @text Огибание углов: полы
 * @desc Подсветка пола в глухих углах. 0.05 — едва заметный, безопасный уровень.
 * @type number
 * @min 0
 * @max 1
 * @decimals 2
 * @default 0.05
 *
 * @param _sep_noise
 * @text ========== ШУМ ТЕНЕЙ (экспериментально) ==========
 * @desc
 * @default
 *
 * @param shadowNoiseIntensity
 * @text Интенсивность шума (0..1)
 * @desc Дизеринг тени по всей площади. 0 — выкл, >0 — вкл. Рекомендуемое: 0.3.
 * @type number
 * @min 0
 * @max 1
 * @decimals 2
 * @default 0
 *
 * @param shadowNoiseScale
 * @text Масштаб шума (1..10)
 * @desc Размер зерна. 1 — мелкий, 10 — крупный. Рекомендуемое: 2.
 * @type number
 * @min 1
 * @max 10
 * @decimals 0
 * @default 2
 *
 * @param _sep_debug
 * @text ========== ОТЛАДКА ==========
 * @desc
 * @default
 *
 * @param perfLog
 * @text Счётчики (дебаг)
 * @desc Выводит в консоль (F12) цифры производительности. Включайте только для тестов.
 * @type boolean
 * @default false
 *
 * @command refresh
 * @text Обновить кэш света
 *
 * @command resetDefaults
 * @text Сбросить правки из событий
 *
 * @command resetFactory
 * @text Сбросить всё к заводским
 *
 * @help
 * ============================================================================
 *  LightOcclusion_CL v6.4.1 — тени для Community Lighting MZ
 * ============================================================================
 *
 *  Окклюзия света для Community_Lighting_MZ. Работает из коробки и не требует
 *  дополнительных настроек.
 *
 *  Требования и порядок:
 *    - Файл: строго LightOcclusion_CL.js.
 *    - Community_Lighting_MZ — ВЫШЕ этого плагина в списке.
 *      Нарушение порядка — основная причина «свет не работает».
 *
 *  Сброс к дефолтам:
 *    - Команда плагина «Сбросить правки из событий» (или F10).
 *      Сбрасывает только то, что было задано через код (API).
 *    - Команда плагина «Сбросить всё к заводским».
 *      Полный сброс, включая значения из редактора.
 *    - API: LightOcclusion_CL.resetDefaults() / resetFactory().
 *
 *  ВАЖНО: если вы загрузите старый сейв, настройки из него вернутся.
 *  Сброс не меняет старые сохранения. Полный сброс действует
 *  до перезапуска игры или загрузки сейва.
 *
 *  ---------------------------------------------------------------------------
 *  КАК РАБОТАЕТ
 *  ---------------------------------------------------------------------------
 *  Community Lighting рисует свет без учёта стен. Плагин строит
 *  геометрические силуэты теней от стен и вырезает их из маски света.
 *  Это позволяет теням быть идеально гладкими и работать в 2-3 раза
 *  быстрее, чем при попиксельном просчёте лучей.
 *
 *  ---------------------------------------------------------------------------
 *  КРАТКО О COMMUNITY LIGHTING
 *  ---------------------------------------------------------------------------
 *  Источники света задаются в Community_Lighting_MZ, не здесь.
 *  Комментарий события или страницы карты, пример:
 *
 *      <cl: light 250 #ffffff>
 *
 *  250 — радиус в пикселях, #ffffff — цвет. Точный синтаксис зависит
 *  от версии CL — сверяйтесь с её документацией.
 *
 *  ---------------------------------------------------------------------------
 *  РЕГИОНЫ
 *  ---------------------------------------------------------------------------
 *  Регион назначается тайлу в редакторе карт (ПКМ -> «Регион»).
 *
 *    Регион 1 — стены. Блокирует свет. Если занят — смените
 *               «Регион стен» в параметрах.
 *    Регион 2 — зона резких теней. При входе игрока включается
 *               пресет «Резкие». 0 — выключено.
 *
 *  ---------------------------------------------------------------------------
 *  ПАРАМЕТРЫ АТМОСФЕРЫ
 *  ---------------------------------------------------------------------------
 *  Не влияют на FPS. Можно крутить смело.
 *
 *    Мягкость краёв (0.6)            — сглаживание края тени.
 *    Смещение тени (0.5)             — закрывает зазор между тенью и спрайтом.
 *    Вертикальное затухание (0.6)    — затемнение верха стены.
 *    Свет на фасаде стен (0.4)       — яркость грани стены у пола.
 *    Градиент низа стены (0.2)       — свет «протекает» на низ стены.
 *    Высота градиента (0.33)         — насколько высоко.
 *    Огибание углов: стены (0.05)    — подсветка углов у пола.
 *    Огибание углов: полы (0.05)     — подсветка пола в углах.
 *
 *  ---------------------------------------------------------------------------
 *  ПАРАМЕТРЫ ПРОИЗВОДИТЕЛЬНОСТИ
 *  ---------------------------------------------------------------------------
 *  Влияют на FPS. Дефолты подобраны; менять без причины не нужно.
 *
 *    Точность видимости (6)      — проверок на пути луча. 8–10 дают
 *                                  -10% FPS без визуальной разницы.
 *    Разрешение маски (0.4)      — качество картинки теней. 0.5–0.6
 *                                  дороже, визуально почти незаметно.
 *    Область окклюзии (16)       — радиус расчёта теней, тайлы.
 *    Дальность отсева света (20) — отключение света за пределами.
 *                                  Должна быть БОЛЬШЕ области окклюзии.
 *
 *  ---------------------------------------------------------------------------
 *  КЭШ
 *  ---------------------------------------------------------------------------
 *  Готовые тени хранятся в памяти. Больше лимит — меньше пересчётов
 *  при ходьбе, но больше памяти (тени — изображения).
 *
 *    Лимит памяти теней (128)    — безопасный баланс. Можно поднять до 256,
 *                                  если у вас много свободной памяти (каждая тень
 *                                  весит около 1.7 МБ при тайлах 48х48).
 *
 *  ---------------------------------------------------------------------------
 *  ШУМ ТЕНЕЙ (статичен)
 *  ---------------------------------------------------------------------------
 *  Добавляет зерно к теням. По умолчанию выключено.
 *
 *    Интенсивность шума (0)      — 0 = выкл. >0 = включить.
 *                                  Рекомендуемое: 0.3.
 *    Масштаб шума (2)            — размер зерна. 1 — мелкий, 10 — крупный.
 *
 *  ---------------------------------------------------------------------------
 *  ЗАТУХАНИЕ
 *  ---------------------------------------------------------------------------
 *  Невидимые игроку лампы плавно гаснут. Экономит ресурсы;
 *  визуально не заметно, пока не подойдёте.
 *
 *    Тьма поглощает свет (вкл)        — вкл/выкл механику.
 *    Скорость появления (1.6 сек)     — плавность включения.
 *    Скорость затухания (1.6 сек)     — плавность выключения.
 *    Задержка смены видимости (9)     — кадров до смены состояния.
 *
 *  ---------------------------------------------------------------------------
 *  ПРИОРИТЕТ НАСТРОЕК (ПРЕСЕТЫ)
 *  ---------------------------------------------------------------------------
 *  У каждого пресета есть 4 главных параметра: радиус, лучи, мягкость, маска.
 *
 *    Если «Пресет главнее редактора» (ВКЛ по умолчанию):
 *    Пресет сам управляет этими четырьмя параметрами, игнорируя
 *    изменения в редакторе. Остальные параметры (атмосфера,
 *    затухание, шум) плагин берёт из редактора.
 *
 *    Если ВЫКЛ:
 *    Пресет управляет только теми параметрами, которые НЕ изменялись
 *    в редакторе. Если параметр был изменён вручную, он главнее пресета.
 *
 *  ---------------------------------------------------------------------------
 *  ОТЛАДКА
 *  ---------------------------------------------------------------------------
 *  «Счётчики» — вывод в консоль (F12). Включать на тестах: вывод
 *  тоже расходует ресурсы.
 *
 *  FPS просел? Открой консоль (F12) и смотри, что растёт:
 *    cell    — построение теней → снизить «Лимит памяти теней».
 *    compose — сборка → снизить «Разрешение маски» или «Область окклюзии».
 *    blit    — наложение → проверить «Сглаживание картинки».
 *
 *  Строки «[LightOcclusion_CL] активирован…» в консоли нет —
 *  плагин не подключён (проверить порядок и имя файла).
 *
 *  ---------------------------------------------------------------------------
 *  КОМАНДЫ ПЛАГИНА
 *  ---------------------------------------------------------------------------
 *    Обновить кэш света             — сброс и пересчёт. Нужно, если стены
 *                                     или регионы менялись в рантайме.
 *    Сбросить правки из событий     — сброс правок, сделанных через API.
 *    Сбросить всё к заводским       — полный сброс, включая редактор.
 *
 *  ---------------------------------------------------------------------------
 *  API
 *  ---------------------------------------------------------------------------
 *    LightOcclusion_CL.setParam('edgeSoftness', 0.8);
 *    LightOcclusion_CL.setParams({ preset: 'chunky', edgeSoftness: 0.9 });
 *    LightOcclusion_CL.refresh();
 *    LightOcclusion_CL.resetDefaults();
 *    LightOcclusion_CL.version;
 *
 *  Типичный сценарий: в подвале — preset 'sharp', на поверхности —
 *  вернуть 'balanced'. Настройки сохраняются в сейв.
 *
 *  ---------------------------------------------------------------------------
 *  FAQ
 *  ---------------------------------------------------------------------------
 *  Тени не появляются.
 *    Порядок плагинов (CL выше). Стены размечены Регионом 1.
 *    В консоли есть строка активации.
 *
 *  Тени ступенчатые.
 *    «Мягкость краёв» 0.6, «Разрешение маски» 0.4.
 *    Возможно, мала «Область окклюзии».
 *
 *  FPS просел.
 *    «Область окклюзии» 16 → 14; «Лимит памяти теней» 128 → 64;
 *    «Разрешение маски» 0.4 → 0.35. Сверяйтесь со счётчиками.
 *
 *  Свет пропадает при отходе.
 *    Это затухание. Отключите «Тьма поглощает свет».
 *
 *  В зоне тени резкие сами по себе.
 *    Там Регион 2. Поставьте 0, если не нужно.
 *
 *  Разные настройки на разных картах.
 *    Параметры плагина глобальны. Используйте setParams через
 *    «Выполнить скрипт» при входе на карту.
 *
 *  Не уверены в значении — оставьте дефолт. Сломали — F10.
 */
(function() {
    'use strict';

    if (!window.Community || !Community.Lighting) {
        console.error('[LightOcclusion_CL] Community_Lighting_MZ не найден!');
        return;
    }
    const CL = Community.Lighting;
    const P = PluginManager.parameters('LightOcclusion_CL');

    const VERSION = '6.4.1';
    const PADDING = +CL.parameters['Lightmask Padding'] || 32;

    const _DEFAULTS = {
        preset: 'balanced',
        presetOverridesEditor: true,
        wallRegion: 1,
        sharpRegion: 2,
        fadeUnseenSources: true,
        fadeInDuration: 1.6,
        fadeOutDuration: 1.6,
        visibilityHysteresis: 9,
        sourceCullRadius: 20,
        maxOcclusionRadius: 16,
        raySamples: 6,
        cacheQuantize: 8,
        sourceSnap: 8,
        maskScale: 0.4,
        maskSmooth: true,
        maxCellCount: 128,
        maxComposeCaches: 64,
        wallBottomFade: 0.2,
        wallBottomFadeHeight: 0.33,
        facadeLightAlpha: 0.4,
        wallShadowFade: 0.6,
        cornerBleed: 0.05,
        cornerGlow: 0.05,
        edgeSoftness: 0.6,
        shadowOffset: 0.5,
        shadowNoiseIntensity: 0,
        shadowNoiseScale: 2,
        perfLog: false
    };

    const _RU_NAMES = {
        wallRegion: 'Регион стен', sharpRegion: 'Регион резких теней',
        fadeUnseenSources: 'Тьма поглощает свет', fadeInDuration: 'Скорость появления',
        fadeOutDuration: 'Скорость затухания', visibilityHysteresis: 'Задержка смены видимости',
        sourceCullRadius: 'Дальность отсева света', maxOcclusionRadius: 'Область окклюзии',
        raySamples: 'Точность видимости', maskScale: 'Разрешение маски',
        maxCellCount: 'Лимит памяти теней', edgeSoftness: 'Мягкость краев',
        shadowOffset: 'Смещение тени', wallShadowFade: 'Вертикальное затухание',
        wallBottomFade: 'Градиент низа', wallBottomFadeHeight: 'Высота градиента низа',
        facadeLightAlpha: 'Свет на фасаде', cornerBleed: 'Огибание углов: стены',
        cornerGlow: 'Огибание углов: полы', shadowNoiseIntensity: 'Интенсивность шума',
        shadowNoiseScale: 'Масштаб шума', presetOverridesEditor: 'Пресет главнее редактора',
        preset: 'Пресет теней', cacheQuantize: 'Квантование кэша (тех)',
        sourceSnap: 'Привязка источников (тех)', maskSmooth: 'Сглаживание маски (тех)',
        maxComposeCaches: 'Лимит кэша сборок (тех)'
    };

    const _PRESETS = {
        balanced: { maxOcclusionRadius: 16, raySamples: 6, edgeSoftness: 0.6, maskScale: 0.4  },
        chunky:   { maxOcclusionRadius: 16, raySamples: 6, edgeSoftness: 0.8, maskScale: 0.35 },
        sharp:    { maxOcclusionRadius: 16, raySamples: 8, edgeSoftness: 0.2, maskScale: 0.5  }
    };

    const ALPHA_MAP_LIMIT = 256;
    const CELL_POOL_LIMIT = 32;
    const COMPOSE_POOL_LIMIT = 64;

    const _sessionTouch = {};
    for (const k in _DEFAULTS) {
        if (k === 'preset') continue;
        const def = _DEFAULTS[k];
        const pv = P[k];
        if (pv === undefined) { _sessionTouch[k] = false; continue; }
        if (typeof def === 'boolean') {
            _sessionTouch[k] = String(pv) !== String(def);
        } else if (typeof def === 'number') {
            _sessionTouch[k] = !isNaN(Number(pv)) && Number(pv) !== def;
        } else {
            _sessionTouch[k] = String(pv) !== String(def);
        }
    }

    let WALL_REGION, SHARP_REGION, MAX_RADIUS, RAY_SAMPLES,
        CACHE_Q, SNAP, MASK_SCALE, MASK_SMOOTH,
        MAX_CELLS, MAX_COMPOSE,
        FADE_UNSEEN, FADE_IN_LERP, FADE_OUT_LERP, SOURCE_CULL, HYSTERESIS,
        EDGE_SOFTNESS, WALL_SHADOW_FADE,
        CORNER_BLEED, CORNER_GLOW, PERF_LOG, CELL_PRE_BLUR, SHADOW_OFFSET,
        SHADOW_NOISE_INT, SHADOW_NOISE_SCALE,
        WALL_BOTTOM_FADE, WALL_BOTTOM_FADE_HEIGHT, FACADE_LIGHT_ALPHA,
        PRESET_OVERRIDES_EDITOR;

    let _activeOverride = null, _forcePreset = null, _inSharpZone = false;
    let _factoryReset = false;
    let _acc = { compose:0, composeHit:0, cellBuild:0, blit:0, count:0, built:0, noise:0 };
    let _lastLog = 0;
    const _sourceAlphaMap = new Map(), _sourceVisStreak = new Map();
    const _visCache = new Map();
    let _visCachePlayerX = -1, _visCachePlayerY = -1;

    let _warnedCull = false;
    let _warnedSnap = false;
    let _warnedMemory = false;

    let _shadowBmp = null;
    let _noisePattern = null;

    function numOr(v, fb) { 
        if (v === null || v === undefined || v === '') return fb;
        const n = Number(v); 
        return Number.isFinite(n) ? n : fb; 
    }
    function lerpForDuration(sec) { return 1 - Math.pow(0.001, 1 / (60 * Math.max(0.05, sec))); }

    function applyConfig() {
        const get0 = (key, fb) => {
            if (_activeOverride && _activeOverride[key] !== undefined) return _activeOverride[key];
            if (!_factoryReset && P[key] !== undefined) return P[key];
            return fb;
        };
        const presetName = (_activeOverride && _activeOverride['preset'] !== undefined)
            ? _activeOverride['preset']
            : (_forcePreset || String(get0('preset', 'balanced') || 'balanced'));
        const preset = _PRESETS[presetName] || _PRESETS.balanced;
        const apiPresetSet = (_activeOverride && _activeOverride['preset'] !== undefined);
        
        PRESET_OVERRIDES_EDITOR = String(get0('presetOverridesEditor', true)) !== 'false';

        const get = (key, fb) => {
            if (_activeOverride && _activeOverride[key] !== undefined) return _activeOverride[key];
            if (apiPresetSet && preset[key] !== undefined) return preset[key];
            if (_forcePreset && preset[key] !== undefined) return preset[key];
            if (PRESET_OVERRIDES_EDITOR && preset[key] !== undefined) return preset[key];
            if (!_factoryReset && _sessionTouch[key] && P[key] !== undefined) return P[key];
            if (preset[key] !== undefined) return preset[key];
            if (!_factoryReset && P[key] !== undefined) return P[key];
            return fb;
        };

        WALL_REGION     = Math.max(1, numOr(get('wallRegion', 1), 1));
        SHARP_REGION    = Math.max(0, numOr(get('sharpRegion', 2), 0));
        FADE_UNSEEN     = String(get('fadeUnseenSources', true)) !== 'false';
        SOURCE_CULL     = Math.max(2, numOr(get('sourceCullRadius', 20), 20));
        HYSTERESIS      = Math.max(1, numOr(get('visibilityHysteresis', 9), 9));
        MAX_RADIUS      = Math.max(1, numOr(get('maxOcclusionRadius', 16), 16));
        RAY_SAMPLES     = Math.max(2, numOr(get('raySamples', 6), 6));
        CACHE_Q         = Math.max(2, Math.min(24, numOr(get('cacheQuantize', 8), 8)));
        SNAP            = Math.max(2, Math.min(64, numOr(get('sourceSnap', 8), 8)));
        MASK_SCALE      = Math.max(0.25, Math.min(1.0, numOr(get('maskScale', 0.4), 0.4)));
        MASK_SMOOTH     = String(get('maskSmooth', true)) !== 'false';
        MAX_CELLS       = Math.max(16, Math.min(512, numOr(get('maxCellCount', 128), 128)));
        MAX_COMPOSE     = Math.max(2, Math.min(128, numOr(get('maxComposeCaches', 64), 64)));
        PERF_LOG        = String(get('perfLog', false)) === 'true';

        FADE_IN_LERP    = lerpForDuration(numOr(get('fadeInDuration', 1.6), 1.6));
        FADE_OUT_LERP   = lerpForDuration(numOr(get('fadeOutDuration', 1.6), 1.6));

        CORNER_BLEED    = Math.max(0, Math.min(1, numOr(get('cornerBleed', 0.05), 0.05)));
        CORNER_GLOW     = Math.max(0, Math.min(1, numOr(get('cornerGlow', 0.05), 0.05)));
        EDGE_SOFTNESS   = Math.max(0, Math.min(1, numOr(get('edgeSoftness', 0.6), 0.6)));
        WALL_SHADOW_FADE       = Math.max(0, Math.min(1, numOr(get('wallShadowFade', 0.6), 0.6)));

        WALL_BOTTOM_FADE        = Math.max(0, Math.min(1, numOr(get('wallBottomFade', 0.2), 0.2)));
        WALL_BOTTOM_FADE_HEIGHT = Math.max(0.1, Math.min(0.9, numOr(get('wallBottomFadeHeight', 0.33), 0.33)));
        FACADE_LIGHT_ALPHA      = Math.max(0, Math.min(1, numOr(get('facadeLightAlpha', 0.4), 0.4)));

        SHADOW_OFFSET           = Math.max(0, Math.min(0.5, numOr(get('shadowOffset', 0.5), 0.5)));
        SHADOW_NOISE_INT        = Math.max(0, Math.min(1, numOr(get('shadowNoiseIntensity', 0), 0)));
        SHADOW_NOISE_SCALE      = Math.max(1, Math.min(10, numOr(get('shadowNoiseScale', 2), 2)));

        CELL_PRE_BLUR   = EDGE_SOFTNESS * 10;

        if (SOURCE_CULL >= MAX_RADIUS) _warnedCull = false;
        if (SOURCE_CULL < MAX_RADIUS && !_warnedCull) {
            console.warn('[LightOcclusion_CL] sourceCullRadius (' + SOURCE_CULL +
                ') < maxOcclusionRadius (' + MAX_RADIUS +
                '). Возможен поппинг света: лампа гаснет раньше, чем кончается окклюзия.');
            _warnedCull = true;
        }

        const tileSize = $gameMap ? $gameMap.tileWidth() : 48;
        const cellTiles = 2 * MAX_RADIUS + 2;
        const composeTiles = 2 * (MAX_RADIUS + 2) + 2;
        const cellPixels = Math.pow(cellTiles * tileSize * MASK_SCALE, 2);
        const composePixels = Math.pow(composeTiles * tileSize * MASK_SCALE, 2);
        const estMB = Math.round((MAX_CELLS * cellPixels + MAX_COMPOSE * composePixels + CELL_POOL_LIMIT * cellPixels + COMPOSE_POOL_LIMIT * composePixels) * 4 / 1024 / 1024);

        const defRadius = 16;
        const defMaskScale = 0.4;
        const defCellTiles = 2 * defRadius + 2;
        const defComposeTiles = 2 * (defRadius + 2) + 2;
        const defCellPx = Math.pow(defCellTiles * tileSize * defMaskScale, 2);
        const defCompPx = Math.pow(defComposeTiles * tileSize * defMaskScale, 2);
        const defEstMB = (128 * defCellPx + 64 * defCompPx + 32 * defCellPx + 64 * defCompPx) * 4 / 1024 / 1024;

        if (estMB > defEstMB * 1.25) {
            if (!_warnedMemory) {
                console.warn('[LightOcclusion_CL] Внимание: высокие настройки памяти. ' +
                    'Ожидаемый расход памяти: ~' + estMB + ' МБ. ' +
                    'Если игра тормозит, уменьшите «Лимит памяти теней» или «Область окклюзии».');
                _warnedMemory = true;
            }
        } else {
            _warnedMemory = false;
        }

        if (SNAP === CACHE_Q) _warnedSnap = false;
        if (SNAP !== CACHE_Q && !_warnedSnap) {
            console.warn('[LightOcclusion_CL] sourceSnap (' + SNAP +
                ') !== cacheQuantize (' + CACHE_Q +
                '). Рекомендуется выровнять: рассинхрон ключей двух кэшей.');
            _warnedSnap = true;
        }
    }
    applyConfig();

    function logEditorOverrides() {
        if (_factoryReset) return;
        const touched = [];
        for (const k in _sessionTouch) {
            if (_sessionTouch[k] && k !== 'presetOverridesEditor') touched.push(k);
        }
        if (touched.length === 0) return;
        
        let lines = [];
        let currentLine = '[LightOcclusion_CL] Внимание: изменены в редакторе: ';
        for (let i = 0; i < touched.length; i++) {
            const k = touched[i];
            const n = _RU_NAMES[k] || k;
            const val = P[k];
            if (i > 0) currentLine += ', ';
            currentLine += n + ' = ' + val;
            if (currentLine.length > 70) {
                lines.push(currentLine);
                currentLine = '  ';
            }
        }
        if (currentLine.trim() !== '') lines.push(currentLine);
        
        for (const l of lines) console.log(l);
        console.log('[LightOcclusion_CL] Примечание: если галочка "Пресет главнее редактора" включена, пресет игнорирует ваши настройки для (радиус, лучи, мягкость, маска).');
    }
    logEditorOverrides();

    function generateNoisePattern(scale) {
        const size = 64;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        const imgData = ctx.createImageData(size, size);
        const data = imgData.data;

        for (let i = 0; i < data.length; i += 4) {
            data[i] = 0;
            data[i+1] = 0;
            data[i+2] = 0;
            data[i+3] = Math.floor(Math.random() * 256);
        }
        ctx.putImageData(imgData, 0, 0);

        if (scale <= 1) return canvas;

        const bigSize = size * scale;
        const bigCanvas = document.createElement('canvas');
        bigCanvas.width = bigSize;
        bigCanvas.height = bigSize;
        const bctx = bigCanvas.getContext('2d');
        bctx.imageSmoothingEnabled = false;
        bctx.drawImage(canvas, 0, 0, size, size, 0, 0, bigSize, bigSize);
        return bigCanvas;
    }

    function ensureNoisePattern() {
        if (!_noisePattern || _noisePattern._scale !== SHADOW_NOISE_SCALE) {
            _noisePattern = generateNoisePattern(SHADOW_NOISE_SCALE);
            _noisePattern._scale = SHADOW_NOISE_SCALE;
        }
    }

    function quantizePos(v) { return Math.round(v * CACHE_Q) / CACHE_Q; }
    function quantizeRadius(rTiles) { return Math.round(rTiles * 4) / 4; }
    function effectiveRadius(rTiles) { return Math.min(MAX_RADIUS, Math.max(2, Math.ceil(rTiles) + 1)); }

    function trimAlphaMaps() {
        while (_sourceAlphaMap.size > ALPHA_MAP_LIMIT) _sourceAlphaMap.delete(_sourceAlphaMap.keys().next().value);
        while (_sourceVisStreak.size > ALPHA_MAP_LIMIT) _sourceVisStreak.delete(_sourceVisStreak.keys().next().value);
    }

    function logStats() {
        if (!PERF_LOG) return;
        const f = Graphics.frameCount;
        if (f - _lastLog < 60) return;
        _lastLog = f;
        const c = _acc;
        if (c.count === 0) { _acc = { compose:0, composeHit:0, cellBuild:0, blit:0, count:0, built:0, noise:0 }; return; }
        let fading = 0, faded = 0;
        for (const v of _sourceAlphaMap.values()) { if (v < 0.01) faded++; else if (v < 0.99) fading++; }
        console.log('[LightOcclusion_CL] ср/кадр:',
            'src:', (c.count/60).toFixed(1),
            'compose:', (c.compose/60).toFixed(2),
            'hits:', (c.composeHit/60).toFixed(2),
            'cell:', (c.cellBuild/60).toFixed(2),
            'blit:', (c.blit/60).toFixed(2),
            'built:', c.built,
            'noise:', c.noise,
            'fading:', fading, 'faded:', faded,
            'sharp:', _inSharpZone ? 'on' : 'off');
        _acc = { compose:0, composeHit:0, cellBuild:0, blit:0, count:0, built:0, noise:0 };
    }

    let _wallShapeCache = null;
    let _wallShapeMapId = -1, _anyWall = false;

    function buildWallShapeCache() {
        const w = $gameMap.width(), h = $gameMap.height();
        const cache = new Array(w);
        _anyWall = false;
        const isW = (x, y) => (x>=0 && y>=0 && x<w && y<h && $gameMap.regionId(x,y) === WALL_REGION);

        for (let x = 0; x < w; x++) {
            cache[x] = new Array(h);
            for (let y = 0; y < h; y++) {
                if ($gameMap.regionId(x,y) !== WALL_REGION) { cache[x][y] = 0; continue; }
                _anyWall = true;
                const hN = (isW(x-1,y)?1:0) + (isW(x+1,y)?1:0);
                const vN = (isW(x,y-1)?1:0) + (isW(x,y+1)?1:0);
                if (hN > vN)      cache[x][y] = 1;
                else if (vN > hN) cache[x][y] = 2;
                else              cache[x][y] = 3;
            }
        }
        _wallShapeCache = cache;
        _wallShapeMapId = $gameMap.mapId();
    }

    function ensureCache() {
        if (_wallShapeMapId !== $gameMap.mapId() || !_wallShapeCache) buildWallShapeCache();
    }

    function wallSolidAtTile(tx, ty) {
        tx = Math.floor(tx); ty = Math.floor(ty);
        if (tx<0||ty<0||tx>=$gameMap.width()||ty>=$gameMap.height()) return true;
        const row = _wallShapeCache[tx];
        if (!row) return true;
        const shape = row[ty];
        return (shape !== undefined && shape !== 0);
    }

    function hasLOS(x0, y0, x1, y1) {
        const dx = x1-x0, dy = y1-y0;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 0.0001) return true;
        const samples = Math.max(2, Math.ceil(dist * RAY_SAMPLES));
        let ptx = Math.floor(x0), pty = Math.floor(y0);
        const startTx = ptx, startTy = pty;

        for (let i = 1; i <= samples; i++) {
            const t = i / samples;
            const px = x0 + dx * t, py = y0 + dy * t;
            const tx = Math.floor(px), ty = Math.floor(py);
            const skipCardinal = (tx === startTx && ty === startTy);
            if (wallSolidAtTile(px, py) && !skipCardinal) return false;
            if (tx !== ptx || ty !== pty) {
                if (Math.abs(tx-ptx) === 1 && Math.abs(ty-pty) === 1) {
                    const skipDiag = (ptx === startTx && pty === startTy);
                    if (!skipDiag) {
                        if (wallSolidAtTile(tx+0.5, pty+0.5) && wallSolidAtTile(ptx+0.5, ty+0.5)) return false;
                    }
                }
                ptx = tx; pty = ty;
            }
        }
        return true;
    }

    let _tempMul = null, _tempAdd = null;

    function ensureBuffers(w, h) {
        if (!_tempMul || _tempMul.width !== w || _tempMul.height !== h) {
            _tempMul = new Bitmap(w, h); _tempAdd = new Bitmap(w, h);
        }
    }

    function ensureShadowBuffer(w, h) {
        if (!_shadowBmp || _shadowBmp.width !== w || _shadowBmp.height !== h) {
            _shadowBmp = new Bitmap(w, h);
        }
    }

    const _cellPool = [];
    function acquireCell(w, h) {
        for (let i = _cellPool.length - 1; i >= 0; i--) {
            const b = _cellPool[i];
            if (b.width === w && b.height === h) { _cellPool.splice(i, 1); return b; }
        }
        return new Bitmap(w, h);
    }
    function releaseCell(bitmap) {
        if (_cellPool.length >= CELL_POOL_LIMIT) return;
        const ctx = bitmap.context;
        ctx.setTransform(1,0,0,1,0,0); ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
        ctx.clearRect(0, 0, bitmap.width, bitmap.height);
        bitmap._originTx = 0; bitmap._originTy = 0;
        _cellPool.push(bitmap);
    }

    const _cellCache = new Map();

    function cellKey(qx, qy, rKey) {
        return qx.toFixed(3) + ',' + qy.toFixed(3) + ',' + rKey.toFixed(2) + '|' + $gameMap.mapId();
    }
    function cellDimensions(rTiles) {
        const pw = $gameMap.tileWidth(), ph = $gameMap.tileHeight();
        const rT = effectiveRadius(rTiles);
        const cellTiles = 2*rT + 2;
        return { w: Math.ceil(cellTiles * pw * MASK_SCALE), h: Math.ceil(cellTiles * ph * MASK_SCALE) };
    }

    function buildCellInto(bitmap, srcTx, srcTy, rTiles) {
        const w = bitmap.width, h = bitmap.height;
        const ctx = bitmap.context;

        ensureShadowBuffer(w, h);
        const sCtx = _shadowBmp.context;

        ctx.setTransform(1,0,0,1,0,0); ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
        sCtx.setTransform(1,0,0,1,0,0); sCtx.globalCompositeOperation = 'source-over'; sCtx.globalAlpha = 1;

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, w, h);
        sCtx.clearRect(0, 0, w, h);

        const pwF = $gameMap.tileWidth(), phF = $gameMap.tileHeight();
        const pw = pwF * MASK_SCALE, ph = phF * MASK_SCALE;
        const radius = effectiveRadius(rTiles);
        const originTx = Math.floor(srcTx - radius - 1);
        const originTy = Math.floor(srcTy - radius - 1);
        bitmap._originTx = originTx; bitmap._originTy = originTy;

        const tilesW = Math.ceil(w / pw), tilesH = Math.ceil(h / ph);
        const mapW = $gameMap.width(), mapH = $gameMap.height();
        const rLimSq = (radius + 1) * (radius + 1);

        sCtx.fillStyle = '#000000';
        const shiftAmt = SHADOW_OFFSET * pw;

        for (let dty = 0; dty < tilesH; dty++) {
            const ty = originTy + dty;
            if (ty < 0 || ty >= mapH) continue;
            for (let dtx = 0; dtx < tilesW; dtx++) {
                const tx = originTx + dtx;
                if (tx < 0 || tx >= mapW) continue;

                const shapeCol = _wallShapeCache[tx];
                const shape = shapeCol ? shapeCol[ty] : 0;
                if (shape === 0) continue;

                const wx = dtx * pw;
                const wy = dty * ph;
                const ww = pw;
                const wh = ph;

                const sx = (srcTx - originTx) * pw;
                const sy = (srcTy - originTy) * ph;

                const c0 = { x: wx, y: wy };
                const c1 = { x: wx + ww, y: wy };
                const c2 = { x: wx + ww, y: wy + wh };
                const c3 = { x: wx, y: wy + wh };

                const c0s = shiftToward(c0, sx, sy, shiftAmt);
                const c1s = shiftToward(c1, sx, sy, shiftAmt);
                const c2s = shiftToward(c2, sx, sy, shiftAmt);
                const c3s = shiftToward(c3, sx, sy, shiftAmt);

                if ((wy - sy) < 0) drawEdgeShadow(sCtx, sx, sy, c0s, c1s, radius, pw);
                if ((wx + ww - sx) > 0) drawEdgeShadow(sCtx, sx, sy, c1s, c2s, radius, pw);
                if ((wy + wh - sy) > 0) drawEdgeShadow(sCtx, sx, sy, c2s, c3s, radius, pw);
                if ((wx - sx) < 0) drawEdgeShadow(sCtx, sx, sy, c3s, c0s, radius, pw);
            }
        }

        ctx.globalCompositeOperation = 'destination-out';
        ctx.drawImage(_shadowBmp._canvas, 0, 0);
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = '#ffffff';

        const bleedOn = CORNER_BLEED > 0.001;
        const facadeOn = FACADE_LIGHT_ALPHA > 0.001;
        const shadowFadeOn = WALL_SHADOW_FADE > 0.001;
        const fadeOn = WALL_BOTTOM_FADE > 0.001;
        const fadeH = ph * WALL_BOTTOM_FADE_HEIGHT;

        for (let dty = 0; dty < tilesH; dty++) {
            const ty = originTy + dty;
            if (ty < 0 || ty >= mapH) continue;
            for (let dtx = 0; dtx < tilesW; dtx++) {
                const tx = originTx + dtx;
                if (tx < 0 || tx >= mapW) continue;
                const tcx = tx+0.5, tcy = ty+0.5;
                const ddx = tcx-srcTx, ddy = tcy-srcTy;
                if (ddx*ddx + ddy*ddy > rLimSq) continue;

                const baseX = dtx*pw, baseY = dty*ph;
                const shapeCol = _wallShapeCache[tx];
                const shape = shapeCol ? shapeCol[ty] : 0;
                if (shape === 0) continue;

                if (bleedOn) {
                    let anyNeighbor = false;
                    if (tx > 0    && hasLOS(srcTx, srcTy, tx - 0.5, ty + 0.5)) anyNeighbor = true;
                    else if (tx + 1 < mapW && hasLOS(srcTx, srcTy, tx + 1.5, ty + 0.5)) anyNeighbor = true;
                    else if (ty > 0    && hasLOS(srcTx, srcTy, tx + 0.5, ty - 0.5)) anyNeighbor = true;
                    else if (ty + 1 < mapH && hasLOS(srcTx, srcTy, tx + 0.5, ty + 1.5)) anyNeighbor = true;
                    if (anyNeighbor) {
                        ctx.globalAlpha = CORNER_BLEED;
                        ctx.fillRect(baseX, baseY, pw + 0.5, ph + 0.5);
                        ctx.globalAlpha = 1;
                    }
                }

                if (facadeOn) {
                    const fy = ty + 1;
                    if (fy < mapH && !wallSolidAtTile(tx + 0.5, fy + 0.5)) {
                        ctx.fillStyle = '#ffffff';
                        const facadeA = FACADE_LIGHT_ALPHA;
                        if (shadowFadeOn) {
                            for (let step = 0; step < 4; step++) {
                                const yStep = ph / 4;
                                const stepAlpha = facadeA * (1 - WALL_SHADOW_FADE * (1 - (step + 0.5) / 4));
                                ctx.globalAlpha = stepAlpha;
                                ctx.fillRect(baseX, baseY + step * yStep, pw + 0.5, yStep + 0.5);
                            }
                        } else {
                            ctx.globalAlpha = facadeA;
                            ctx.fillRect(baseX, baseY, pw + 0.5, ph + 0.5);
                        }
                        ctx.globalAlpha = 1;
                    }
                }

                if (fadeOn) {
                    let anyFloorNear = false;
                    if (tx > 0 && !wallSolidAtTile(tx - 0.5, ty + 0.5)) anyFloorNear = true;
                    else if (tx + 1 < mapW && !wallSolidAtTile(tx + 1.5, ty + 0.5)) anyFloorNear = true;
                    else if (ty > 0 && !wallSolidAtTile(tx + 0.5, ty - 0.5)) anyFloorNear = true;
                    else if (ty + 1 < mapH && !wallSolidAtTile(tx + 0.5, ty + 1.5)) anyFloorNear = true;
                    if (anyFloorNear) {
                        const fadeH4 = fadeH / 4;
                        ctx.fillStyle = 'rgba(255,255,255,' + (WALL_BOTTOM_FADE * 0.25).toFixed(3) + ')';
                        ctx.fillRect(baseX, baseY + ph - fadeH, pw + 0.5, fadeH4 + 0.5);
                        ctx.fillStyle = 'rgba(255,255,255,' + (WALL_BOTTOM_FADE * 0.50).toFixed(3) + ')';
                        ctx.fillRect(baseX, baseY + ph - fadeH + fadeH4, pw + 0.5, fadeH4 + 0.5);
                        ctx.fillStyle = 'rgba(255,255,255,' + (WALL_BOTTOM_FADE * 0.75).toFixed(3) + ')';
                        ctx.fillRect(baseX, baseY + ph - fadeH + fadeH4 * 2, pw + 0.5, fadeH4 + 0.5);
                        ctx.fillStyle = 'rgba(255,255,255,' + (WALL_BOTTOM_FADE).toFixed(3) + ')';
                        ctx.fillRect(baseX, baseY + ph - fadeH + fadeH4 * 3, pw + 0.5, fadeH4 + 0.5);
                        ctx.fillStyle = '#ffffff';
                    }
                }
            }
        }

        if (CORNER_GLOW > 0.001) {
            for (let dty = 0; dty < tilesH; dty++) {
                const ty = originTy + dty;
                if (ty < 0 || ty >= mapH) continue;
                for (let dtx = 0; dtx < tilesW; dtx++) {
                    const tx = originTx + dtx;
                    if (tx < 0 || tx >= mapW) continue;

                    const shapeCol = _wallShapeCache[tx];
                    const shape = shapeCol ? shapeCol[ty] : 0;
                    if (shape !== 0) continue;

                    const tcx = tx+0.5, tcy = ty+0.5;
                    const ddx = tcx-srcTx, ddy = tcy-srcTy;
                    if (ddx*ddx + ddy*ddy > rLimSq) continue;
                    if (!hasLOS(srcTx, srcTy, tcx, tcy)) continue;

                    let wN = false, wS = false, wE = false, wW = false;
                    if (ty > 0 && wallSolidAtTile(tx + 0.5, ty - 0.5)) wN = true;
                    if (ty + 1 < mapH && wallSolidAtTile(tx + 0.5, ty + 1.5)) wS = true;
                    if (tx + 1 < mapW && wallSolidAtTile(tx + 1.5, ty + 0.5)) wE = true;
                    if (tx > 0 && wallSolidAtTile(tx - 0.5, ty + 0.5)) wW = true;

                    if ((wN && wE) || (wE && wS) || (wS && wW) || (wW && wN)) {
                        const baseX = dtx*pw;
                        const baseY = dty*ph;
                        const cx = baseX + pw/2;
                        const cy = baseY + ph/2;

                        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, pw/2);
                        grad.addColorStop(0, 'rgba(255,255,255,' + CORNER_GLOW + ')');
                        grad.addColorStop(1, 'rgba(255,255,255,0)');

                        ctx.fillStyle = grad;
                        ctx.fillRect(baseX, baseY, pw + 0.5, ph + 0.5);
                    }
                }
            }
        }

        if (CELL_PRE_BLUR > 0.1) {
            const tmp = acquireCell(w, h);
            const tctx = tmp.context;
            tctx.setTransform(1,0,0,1,0,0); tctx.globalCompositeOperation = 'source-over'; tctx.globalAlpha = 1;
            tctx.clearRect(0, 0, w, h);
            tctx.filter = 'blur(' + CELL_PRE_BLUR.toFixed(2) + 'px)';
            tctx.drawImage(bitmap._canvas, 0, 0);
            tctx.filter = 'none';
            ctx.clearRect(0, 0, w, h);
            ctx.drawImage(tmp._canvas, 0, 0);
            releaseCell(tmp);
        }
    }

    function shiftToward(p, sx, sy, amount) {
        const dx = p.x - sx, dy = p.y - sy;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 0.001) return { x: p.x, y: p.y };
        const safeAmount = Math.min(amount, Math.max(0, dist - 0.1));
        return {
            x: p.x - (dx/dist) * safeAmount,
            y: p.y - (dy/dist) * safeAmount
        };
    }

    function drawEdgeShadow(sCtx, sx, sy, p1, p2, radius, pw) {
        const dx1 = p1.x - sx, dy1 = p1.y - sy;
        const dx2 = p2.x - sx, dy2 = p2.y - sy;
        const dist1 = Math.sqrt(dx1*dx1 + dy1*dy1);
        const dist2 = Math.sqrt(dx2*dx2 + dy2*dy2);
        const len1 = Math.max(0, radius * pw - dist1);
        const len2 = Math.max(0, radius * pw - dist2);
        const dir1X = dist1 > 0.001 ? dx1 / dist1 : 0;
        const dir1Y = dist1 > 0.001 ? dy1 / dist1 : 0;
        const dir2X = dist2 > 0.001 ? dx2 / dist2 : 0;
        const dir2Y = dist2 > 0.001 ? dy2 / dist2 : 0;
        const proj1X = p1.x + dir1X * len1;
        const proj1Y = p1.y + dir1Y * len1;
        const proj2X = p2.x + dir2X * len2;
        const proj2Y = p2.y + dir2Y * len2;
        sCtx.beginPath();
        sCtx.moveTo(p1.x, p1.y);
        sCtx.lineTo(p2.x, p2.y);
        sCtx.lineTo(proj2X, proj2Y);
        sCtx.lineTo(proj1X, proj1Y);
        sCtx.closePath();
        sCtx.fill();
    }

    function getCell(qx, qy, rKey) {
        const key = cellKey(qx, qy, rKey);
        let bitmap = _cellCache.get(key);
        if (bitmap) { _cellCache.delete(key); _cellCache.set(key, bitmap); return bitmap; }
        const dim = cellDimensions(rKey);
        bitmap = acquireCell(dim.w, dim.h);
        const t0 = performance.now();
        buildCellInto(bitmap, qx, qy, rKey);
        const dt = performance.now() - t0;
        if (PERF_LOG) { _acc.cellBuild += dt; _acc.built++; }
        _cellCache.set(key, bitmap);
        while (_cellCache.size > MAX_CELLS) {
            const firstKey = _cellCache.keys().next().value;
            const oldBmp = _cellCache.get(firstKey);
            _cellCache.delete(firstKey);
            releaseCell(oldBmp);
        }
        return bitmap;
    }

    const _composeCache = new Map();
    const _composePool = [];
    function acquireComposeBuf(w, h) {
        for (let i = _composePool.length - 1; i >= 0; i--) {
            const b = _composePool[i];
            if (b.width === w && b.height === h) { _composePool.splice(i, 1); return b; }
        }
        return new Bitmap(w, h);
    }
    function releaseComposeBuf(b) {
        if (_composePool.length >= COMPOSE_POOL_LIMIT) return;
        const ctx = b.context;
        ctx.setTransform(1,0,0,1,0,0); ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
        ctx.clearRect(0, 0, b.width, b.height);
        _composePool.push(b);
    }
    function composeKey(srcX, srcY, rKey) {
        const x = quantizePos(srcX);
        const y = quantizePos(srcY);
        return x.toFixed(4) + '|' + y.toFixed(4) + '|' + rKey.toFixed(2) + '|' + $gameMap.mapId();
    }
    function getComposed(srcX, srcY, rTiles) {
        const rKey = quantizeRadius(rTiles);
        const key = composeKey(srcX, srcY, rKey);
        const cached = _composeCache.get(key);
        if (cached) { _composeCache.delete(key); _composeCache.set(key, cached); return cached; }
        const cells = updateCells(srcX, srcY, rKey);
        const cx = cells.qx, cy = cells.qy;
        const pw = $gameMap.tileWidth(), ph2 = $gameMap.tileHeight();
        const pad = effectiveRadius(rKey) + 2;
        const originTx = Math.floor(cx - pad), originTy = Math.floor(cy - pad);
        const wTiles = Math.ceil(2 * pad) + 2, hTiles = Math.ceil(2 * pad) + 2;
        const bmpW = Math.ceil(wTiles * pw * MASK_SCALE), bmpH = Math.ceil(hTiles * ph2 * MASK_SCALE);
        const buf = acquireComposeBuf(bmpW, bmpH);
        buf._originTx = originTx; buf._originTy = originTy;
        const ctx = buf.context;
        ctx.setTransform(1,0,0,1,0,0); ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
        ctx.clearRect(0, 0, bmpW, bmpH);
        const pwS = pw * MASK_SCALE, phS = ph2 * MASK_SCALE;
        const bitmap = cells.cell;
        const ox = (bitmap._originTx - originTx) * pwS;
        const oy = (bitmap._originTy - originTy) * phS;
        ctx.drawImage(bitmap._canvas, ox, oy);
        const entry = { bitmap: buf };
        _composeCache.set(key, entry);
        while (_composeCache.size > MAX_COMPOSE) {
            const firstKey = _composeCache.keys().next().value;
            const oldEntry = _composeCache.get(firstKey);
            _composeCache.delete(firstKey);
            releaseComposeBuf(oldEntry.bitmap);
        }
        return entry;
    }
    function updateCells(srcX, srcY, rTiles) {
        ensureCache();
        const rKey = quantizeRadius(rTiles);
        const qx = quantizePos(srcX);
        const qy = quantizePos(srcY);
        return { cell: getCell(qx, qy, rKey), qx, qy };
    }

    let _origRadial = null, _origFlash = null;
    let _patched = false;
    let _patchGaveUp = false;

    function isOffScreen(srcX, srcY, rTiles) {
        const dx = $gameMap.displayX(), dy = $gameMap.displayY();
        const sX = Math.ceil(Graphics.width / $gameMap.tileWidth()) + 2;
        const sY = Math.ceil(Graphics.height / $gameMap.tileHeight()) + 2;
        const pad = effectiveRadius(rTiles) + 2;
        if (srcX + pad < dx) return true;
        if (srcX - pad > dx + sX) return true;
        if (srcY + pad < dy) return true;
        if (srcY - pad > dy + sY) return true;
        return false;
    }
    function applyOcclusion(instance, drawFn, args, srcX, srcY, rTiles, isPlayer, alphaMul) {
        if (alphaMul === undefined) alphaMul = 1;
        if (alphaMul <= 0.01) return;
        const realX = srcX, realY = srcY;
        if (isPlayer) { srcX = quantizePos(srcX); srcY = quantizePos(srcY); }
        else { srcX = Math.round(srcX * SNAP) / SNAP; srcY = Math.round(srcY * SNAP) / SNAP; }
        if (isOffScreen(srcX, srcY, rTiles)) return drawFn.apply(instance, args);
        ensureBuffers(instance.multiply.width, instance.multiply.height);
        if (PERF_LOG) _acc.count++;
        const rKey = quantizeRadius(rTiles);
        const key = composeKey(srcX, srcY, rKey);
        const hadCache = _composeCache.has(key);
        let t0 = PERF_LOG ? performance.now() : 0;
        const composed = getComposed(srcX, srcY, rTiles);
        if (PERF_LOG) {
            const dt = performance.now() - t0;
            if (hadCache) _acc.composeHit += dt; else _acc.compose += dt;
        }
        const maskBmp = composed.bitmap;
        const pw = $gameMap.tileWidth(), ph2 = $gameMap.tileHeight();
        const dx = $gameMap.displayX(), dy = $gameMap.displayY();
        const subX = (realX - srcX) * pw;
        const subY = (realY - srcY) * ph2;
        const dstX = Math.round((maskBmp._originTx - dx) * pw + PADDING + subX);
        const dstY = Math.round((maskBmp._originTy - dy) * ph2 + PADDING + subY);
        const dstW = Math.round(maskBmp.width / MASK_SCALE);
        const dstH = Math.round(maskBmp.height / MASK_SCALE);
        const bw0 = instance.multiply.width, bh0 = instance.multiply.height;
        const bx1 = Math.max(0, dstX), by1 = Math.max(0, dstY);
        const bx2 = Math.min(bw0, dstX + dstW), by2 = Math.min(bh0, dstY + dstH);
        const bw = bx2 - bx1, bh = by2 - by1;
        if (bw <= 0 || bh <= 0) return;
        const realMulBmp = instance.multiply, realAddBmp = instance.additive;
        const realMulCtx = realMulBmp._context, realAddCtx = realAddBmp._context;
        const tempMulCtx = _tempMul._context, tempAddCtx = _tempAdd._context;
        
        // ВНИМАНИЕ: зависит от внутренностей Community_Lighting_MZ 4.6.x.
        // drawFn обязан рисовать через this._context, а не через this._canvas напрямую.
        // При обновлении CL — проверить реализацию radialgradientFillRect.
        tempMulCtx.save(); tempMulCtx.beginPath(); tempMulCtx.rect(bx1, by1, bw, bh); tempMulCtx.clip();
        tempAddCtx.save(); tempAddCtx.beginPath(); tempAddCtx.rect(bx1, by1, bw, bh); tempAddCtx.clip();
        realMulCtx.save(); realMulCtx.beginPath(); realMulCtx.rect(bx1, by1, bw, bh); realMulCtx.clip();
        realAddCtx.save(); realAddCtx.beginPath(); realAddCtx.rect(bx1, by1, bw, bh); realAddCtx.clip();
        
        try {
            if (alphaMul < 1) {
                realMulCtx.globalAlpha = alphaMul;
                realAddCtx.globalAlpha = alphaMul;
            }
            tempMulCtx.clearRect(bx1, by1, bw, bh);
            tempAddCtx.clearRect(bx1, by1, bw, bh);
            realMulBmp._context = tempMulCtx; realAddBmp._context = tempAddCtx;
            
            try {
                drawFn.apply(instance, args);
            } finally {
                realMulBmp._context = realMulCtx; realAddBmp._context = realAddCtx;
            }
            
            const prevSmoothM = tempMulCtx.imageSmoothingEnabled;
            const prevSmoothA = tempAddCtx.imageSmoothingEnabled;
            tempMulCtx.imageSmoothingEnabled = MASK_SMOOTH;
            tempAddCtx.imageSmoothingEnabled = MASK_SMOOTH;
            tempMulCtx.globalCompositeOperation = 'destination-in';
            tempMulCtx.drawImage(maskBmp._canvas, 0, 0, maskBmp.width, maskBmp.height, dstX, dstY, dstW, dstH);
            tempMulCtx.globalCompositeOperation = 'source-over';
            tempAddCtx.globalCompositeOperation = 'destination-in';
            tempAddCtx.drawImage(maskBmp._canvas, 0, 0, maskBmp.width, maskBmp.height, dstX, dstY, dstW, dstH);
            tempAddCtx.globalCompositeOperation = 'source-over';

            if (SHADOW_NOISE_INT > 0.001) {
                ensureNoisePattern();
                if (_noisePattern) {
                    try {
                        tempMulCtx.globalCompositeOperation = 'destination-out';
                        tempMulCtx.globalAlpha = SHADOW_NOISE_INT;
                        const pat = tempMulCtx.createPattern(_noisePattern, 'repeat');
                        if (pat) {
                            tempMulCtx.fillStyle = pat;
                            tempMulCtx.fillRect(bx1, by1, bw, bh);
                            if (PERF_LOG) _acc.noise++;
                        }
                        tempMulCtx.globalAlpha = 1;
                        tempMulCtx.globalCompositeOperation = 'source-over';
                    } catch (e) {
                        console.warn('[LightOcclusion_CL] Noise error:', e);
                    }
                }
            }

            tempMulCtx.imageSmoothingEnabled = prevSmoothM;
            tempAddCtx.imageSmoothingEnabled = prevSmoothA;
            
            t0 = PERF_LOG ? performance.now() : 0;
            realMulCtx.globalCompositeOperation = 'lighter';
            realMulCtx.drawImage(_tempMul._canvas, bx1, by1, bw, bh, bx1, by1, bw, bh);
            realMulCtx.globalCompositeOperation = 'source-over';
            realAddCtx.globalCompositeOperation = 'lighter';
            realAddCtx.drawImage(_tempAdd._canvas, bx1, by1, bw, bh, bx1, by1, bw, bh);
            realAddCtx.globalCompositeOperation = 'source-over';
            if (PERF_LOG) _acc.blit += performance.now() - t0;
            
            if (realMulBmp._baseTexture) realMulBmp._baseTexture.update();
            if (realAddBmp._baseTexture) realAddBmp._baseTexture.update();
        } finally {
            tempMulCtx.restore(); tempAddCtx.restore();
            realMulCtx.restore(); realAddCtx.restore();
        }
    }

    // ВНИМАНИЕ: формула выведена из симметрии с веткой isPlayer.
    // Если Community_Lighting изменит способ передачи координат,
    // тени от не-игровых источников могут сместиться. Проверять по скриншотам.
    function computeSourceTile(x, y, isPlayer) {
        const pw = $gameMap.tileWidth(), ph = $gameMap.tileHeight();
        const dx = $gameMap.displayX(), dy = $gameMap.displayY();
        let tx, ty;
        if (isPlayer) {
            tx = (x - pw/2) / pw + dx + 0.5;
            ty = (y - ph/2) / ph + dy + 0.5;
        } else {
            tx = x / pw + dx;
            ty = y / ph + dy;
        }
        return { tx, ty };
    }
    function isLightAtPlayerScreenPos(x, y) {
        const pw = $gameMap.tileWidth(), ph = $gameMap.tileHeight();
        const dx = $gameMap.displayX(), dy = $gameMap.displayY();
        const px = $gamePlayer._realX, py = $gamePlayer._realY;
        return Math.abs(x - (pw/2 + (px - dx)*pw)) < 2 &&
               Math.abs(y - (ph/2 + (py - dy)*ph)) < 2;
    }

    function unseenFadeEnabled() { return FADE_UNSEEN || _inSharpZone; }
    function isSourceVisibleToPlayer(srcTx, srcTy) {
        const px = $gamePlayer.x, py = $gamePlayer.y;
        if (px !== _visCachePlayerX || py !== _visCachePlayerY) {
            _visCache.clear();
            _visCachePlayerX = px; _visCachePlayerY = py;
        }
        const ck = srcTx.toFixed(2) + ',' + srcTy.toFixed(2);
        if (_visCache.has(ck)) return _visCache.get(ck);

        if (_visCache.size > 256) _visCache.delete(_visCache.keys().next().value);

        const ptx = $gamePlayer._realX + 0.5, pty = $gamePlayer._realY + 0.5;
        let result = false;
        
        if (!wallSolidAtTile(srcTx, srcTy)) {
            if (hasLOS(ptx, pty, srcTx, srcTy)) {
                result = true;
            } else {
                const tx = Math.floor(srcTx), ty = Math.floor(srcTy);
                const INSET = 0.15;
                const corners = [
                    [tx + INSET,     ty + INSET    ],
                    [tx + 1 - INSET, ty + INSET    ],
                    [tx + INSET,     ty + 1 - INSET],
                    [tx + 1 - INSET, ty + 1 - INSET]
                ];
                for (let i = 0; i < 4; i++) {
                    const cpx = corners[i][0], cpy = corners[i][1];
                    if (wallSolidAtTile(cpx, cpy)) continue;
                    if (hasLOS(ptx, pty, cpx, cpy)) { result = true; break; }
                }
            }
        } else {
            const tx = Math.floor(srcTx), ty = Math.floor(srcTy);
            const scx = tx + 0.5, scy = ty + 0.5;
            const vx = ptx - scx, vy = pty - scy;
            const neighbors = [
                [tx + 0.5, ty - 0.5],
                [tx + 0.5, ty + 1.5],
                [tx - 0.5, ty + 0.5],
                [tx + 1.5, ty + 0.5]
            ];
            for (let i = 0; i < 4; i++) {
                const nx = neighbors[i][0], ny = neighbors[i][1];
                if (wallSolidAtTile(nx, ny)) continue;
                const ddx = nx - scx, ddy = ny - scy;
                if (vx * ddx + vy * ddy <= 0) continue;
                if (hasLOS(ptx, pty, nx, ny)) { result = true; break; }
            }
        }
        
        _visCache.set(ck, result);
        return result;
    }
    function stableVisibility(key, rawVisible) {
        let streak = _sourceVisStreak.get(key);
        if (streak === undefined) streak = rawVisible ? HYSTERESIS : -HYSTERESIS;
        else if (rawVisible) streak = Math.min(streak + 1, HYSTERESIS * 2);
        else streak = Math.max(streak - 1, -HYSTERESIS * 2);
        _sourceVisStreak.set(key, streak);
        if (streak >= HYSTERESIS) return true;
        if (streak <= -HYSTERESIS) return false;
        return streak > 0;
    }
    function computeAlphaForSource(srcTx, srcTy, rTiles) {
        if (!unseenFadeEnabled()) return 1;
        const ptx = $gamePlayer._realX + 0.5, pty = $gamePlayer._realY + 0.5;
        const dist = Math.sqrt((srcTx - ptx) * (srcTx - ptx) + (srcTy - pty) * (srcTy - pty));
        const rKey = quantizeRadius(rTiles);
        const key = cellKey(quantizePos(srcTx), quantizePos(srcTy), rKey);
        if (dist > SOURCE_CULL) {
            if (_sourceAlphaMap.get(key) === 0) return 0;
            _sourceAlphaMap.delete(key); _sourceAlphaMap.set(key, 0);
            _sourceVisStreak.delete(key); trimAlphaMaps(); return 0;
        }
        const rawVisible = isSourceVisibleToPlayer(srcTx, srcTy);
        const visible = stableVisibility(key, rawVisible);
        const target = visible ? 1 : 0;
        let current = _sourceAlphaMap.get(key);
        if (current === undefined) current = 0;
        const lerp = (target > current) ? FADE_IN_LERP : FADE_OUT_LERP;
        current += (target - current) * lerp;
        if (Math.abs(target - current) < 0.002) current = target;
        _sourceAlphaMap.delete(key); _sourceAlphaMap.set(key, current);
        trimAlphaMaps(); return current;
    }

    function patchedRadial(x, y, xr, yr, c, flicker, brightness, direction) {
        ensureCache();
        if (!_anyWall || (!xr && !yr)) return _origRadial.apply(this, arguments);
        const isPlayer = isLightAtPlayerScreenPos(x, y);
        const src = computeSourceTile(x, y, isPlayer);
        const rTiles = Math.max(xr || 0, yr || 0) / $gameMap.tileWidth();
        let alphaMul = 1;
        if (!isPlayer) {
            alphaMul = computeAlphaForSource(src.tx, src.ty, rTiles);
        }
        applyOcclusion(this, _origRadial, arguments, src.tx, src.ty, rTiles, isPlayer, alphaMul);
    }
    function patchedFlash(x, y, c, dirAngle, flashlength, flashwidth) {
        ensureCache();
        if (!_anyWall) return _origFlash.apply(this, arguments);
        const isPlayer = isLightAtPlayerScreenPos(x, y);
        const src = computeSourceTile(x, y, isPlayer);
        const rTiles = Math.max(4, (flashlength || 8) * 6 / $gameMap.tileWidth());
        let alphaMul = 1;
        if (!isPlayer) alphaMul = computeAlphaForSource(src.tx, src.ty, rTiles);
        applyOcclusion(this, _origFlash, arguments, src.tx, src.ty, rTiles, isPlayer, alphaMul);
    }
    function patchMaskBitmaps() {
        if (_patched || _patchGaveUp) return true;
        const scene = SceneManager._scene;
        if (!scene || !scene._spriteset || !scene._spriteset._lightmask) return false;
        const lm = scene._spriteset._lightmask;
        if (!lm._maskBitmaps) return false;
        const Bmp = lm._maskBitmaps.constructor;
        if (!Bmp || !Bmp.prototype) return false;

        if (!lm._maskBitmaps.multiply || !lm._maskBitmaps.additive) {
            const errMsg = '[LightOcclusion_CL] Структура _maskBitmaps не соответствует ожидаемой ' +
                '(CL несовместим). Патч не активирован.';
            console.error(errMsg);
            if (Utils.isOptionValid('test')) {
                Graphics.printError('LightOcclusion_CL', errMsg);
            }
            _patchGaveUp = true;
            return true;
        }

        _origRadial = Bmp.prototype.radialgradientFillRect;
        _origFlash = Bmp.prototype.radialgradientFlashlight;
        if (typeof _origRadial !== 'function' || typeof _origFlash !== 'function') {
            const errMsg = '[LightOcclusion_CL] radialgradientFillRect/Flashlight не найдены в прототипе. Патч не активирован.';
            console.error(errMsg);
            if (Utils.isOptionValid('test')) {
                Graphics.printError('LightOcclusion_CL', errMsg);
            }
            _patchGaveUp = true;
            return true;
        }
        Bmp.prototype.radialgradientFillRect = patchedRadial;
        Bmp.prototype.radialgradientFlashlight = patchedFlash;
        _patched = true;
        const activePreset = (_activeOverride && _activeOverride['preset'])
            || _forcePreset
            || P['preset']
            || 'balanced';
        console.log('[LightOcclusion_CL] v' + VERSION + ' активирован. Пресет: ' + activePreset);
        return true;
    }

    function clearRenderCache() {
        for (const bmp of _cellCache.values()) releaseCell(bmp);
        _cellCache.clear();
        for (const entry of _composeCache.values()) releaseComposeBuf(entry.bitmap);
        _composeCache.clear();
        _sourceAlphaMap.clear(); _sourceVisStreak.clear();
        _visCache.clear(); _visCachePlayerX = -1; _visCachePlayerY = -1;
    }

    function fullRefresh() {
        _wallShapeCache = null;
        _wallShapeMapId = -1; _anyWall = false;
        clearRenderCache();
    }
    
    function resetToDefaults() {
        _activeOverride = null; _forcePreset = null; _inSharpZone = false;
        _factoryReset = false;
        _warnedCull = false; _warnedSnap = false; _warnedMemory = false;
        applyConfig(); fullRefresh();
        console.log('[LightOcclusion_CL] Рантайм-правки откачены.');
    }
    function resetToFactory() {
        _activeOverride = null; _forcePreset = null; _inSharpZone = false;
        _factoryReset = true;
        for (const k in _sessionTouch) _sessionTouch[k] = false;
        _warnedCull = false; _warnedSnap = false; _warnedMemory = false;
        if ($gameSystem) $gameSystem._locOverride = null;
        applyConfig(); fullRefresh();
        console.log('[LightOcclusion_CL] Полный сброс к заводским настройкам выполнен.');
    }
    function checkSharpZone() {
        if (SHARP_REGION <= 0) return;
        const r = $gamePlayer.regionId();
        const shouldBeSharp = (r === SHARP_REGION);
        if (shouldBeSharp !== _inSharpZone) {
            _inSharpZone = shouldBeSharp;
            _forcePreset = shouldBeSharp ? 'sharp' : null;
            applyConfig(); fullRefresh();
        }
    }

    const _Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
        _Scene_Map_start.call(this);
        let tries = 0;
        const tryPatch = () => {
            if (patchMaskBitmaps()) return;
            if (++tries < 100) {
                requestAnimationFrame(tryPatch);
            } else {
                const errMsg = '[LightOcclusion_CL] Не удалось найти _maskBitmaps за 100 кадров (~1.6 с). ' +
                    'Проверьте: (1) Community_Lighting_MZ стоит ВЫШЕ этого плагина в списке; ' +
                    '(2) имя файла строго LightOcclusion_CL.js; ' +
                    '(3) версия CL совместима (нужна 4.6 или форк с _maskBitmaps).';
                console.error(errMsg);
                if (Utils.isOptionValid('test')) {
                    Graphics.printError('LightOcclusion_CL', errMsg);
                }
            }
        };
        tryPatch();
    };
    const _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this);
        checkSharpZone();
        logStats();
    };
    const _Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded;
    Scene_Map.prototype.onMapLoaded = function() {
        _Scene_Map_onMapLoaded.call(this);
        _inSharpZone = false; _forcePreset = null;
        _sourceAlphaMap.clear(); _sourceVisStreak.clear();
        _visCache.clear(); _visCachePlayerX = -1; _visCachePlayerY = -1;
        applyConfig(); fullRefresh();
        ensureCache();
    };

    PluginManager.registerCommand('LightOcclusion_CL', 'refresh', () => {
        fullRefresh();
        console.log('[LightOcclusion_CL] Кэш света обновлён.');
    });
    PluginManager.registerCommand('LightOcclusion_CL', 'resetDefaults', () => resetToDefaults());
    PluginManager.registerCommand('LightOcclusion_CL', 'resetFactory', () => resetToFactory());

    if (Utils.isOptionValid('test')) {
        document.addEventListener('keydown', function(e) {
            if (e.code === 'F10' || e.key === 'F10') {
                e.preventDefault(); e.stopImmediatePropagation();
                resetToDefaults();
            }
        }, true);
    }

    const _DataManager_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function() {
        if ($gameSystem) {
            $gameSystem._locOverride = (_activeOverride && Object.keys(_activeOverride).length > 0) ? JSON.parse(JSON.stringify(_activeOverride)) : null;
        }
        return _DataManager_makeSaveContents.call(this);
    };

    const _DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        _DataManager_extractSaveContents.call(this, contents);
        if ($gameSystem && $gameSystem._locOverride) {
            const saved = $gameSystem._locOverride;
            const filtered = {};
            let count = 0;
            for (const k in saved) {
                if (_DEFAULTS[k] !== undefined) {
                    filtered[k] = saved[k];
                    count++;
                }
            }
            _activeOverride = count > 0 ? filtered : null;
        } else {
            _activeOverride = null;
        }
        _factoryReset = false;
        applyConfig();
        clearRenderCache();
        console.log('[LightOcclusion_CL] Настройки из сейва загружены:', _activeOverride || 'дефолтные');
    };

    const _DataManager_setupNewGame = DataManager.setupNewGame;
    DataManager.setupNewGame = function() {
        _DataManager_setupNewGame.call(this);
        _activeOverride = null;
        _factoryReset = false;
        applyConfig();
        clearRenderCache();
    };

    window.LightOcclusion_CL = {
        version: VERSION,
        refresh: fullRefresh,
        resetDefaults: resetToDefaults,
        resetFactory: resetToFactory,
        setParam: function(key, value) {
            if (_DEFAULTS[key] === undefined) { console.warn('[LightOcclusion_CL] Неизвестный ключ: "' + key + '"'); return; }
            if (key === 'preset' && value !== undefined && value !== null && !_PRESETS[value]) { console.warn('[LightOcclusion_CL] Неизвестный пресет: ' + value); return; }
            if (!_activeOverride) _activeOverride = {};
            if (value === undefined || value === null) {
                delete _activeOverride[key];
            } else {
                _activeOverride[key] = value;
            }
            _factoryReset = false;
            applyConfig(); fullRefresh();
        },
        setParams: function(obj) {
            if (!obj || typeof obj !== 'object') return;
            if (!_activeOverride) _activeOverride = {};
            let applied = 0; const unknown = [];
            for (const k in obj) {
                if (!Object.prototype.hasOwnProperty.call(obj, k)) continue;
                if (_DEFAULTS[k] === undefined) { unknown.push(k); continue; }
                if (k === 'preset' && obj[k] !== undefined && obj[k] !== null && !_PRESETS[obj[k]]) { unknown.push(k); continue; }
                if (obj[k] === undefined || obj[k] === null) {
                    delete _activeOverride[k];
                } else {
                    _activeOverride[k] = obj[k];
                }
                applied++;
            }
            if (unknown.length > 0) console.warn('[LightOcclusion_CL] Неизвестные или неверные: ' + unknown.join(', '));
            if (applied > 0) { 
                _factoryReset = false;
                applyConfig(); fullRefresh(); 
            }
        }
    };
})();