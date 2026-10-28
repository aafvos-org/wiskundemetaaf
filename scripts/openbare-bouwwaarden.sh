#!/usr/bin/env sh
# Openbare bouwwaarden van wiskundemetaaf.nl. Geen geheimen: deze waarden komen
# toch in de code die elke bezoeker downloadt (NEXT_PUBLIC_…). Ze staan hier,
# zodat Cloudflare Workers Builds geen bouwvariabelen in het dashboard nodig heeft.
# Een waarde die al gezet is (bijv. in een test of in het dashboard) gaat voor.
export NEXT_PUBLIC_SITE_VARIANT="${NEXT_PUBLIC_SITE_VARIANT:-wiskundemetaaf}"
export NEXT_PUBLIC_SITE_URL="${NEXT_PUBLIC_SITE_URL:-https://www.wiskundemetaaf.nl}"
export NEXT_PUBLIC_SUPABASE_URL="${NEXT_PUBLIC_SUPABASE_URL:-https://dccjsuyuolxwqqcjxtqe.supabase.co}"
# De openbare anon-sleutel van de gedeelde database (rol "anon"; mag openbaar).
export NEXT_PUBLIC_SUPABASE_ANON_KEY="${NEXT_PUBLIC_SUPABASE_ANON_KEY:-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjY2pzdXl1b2x4d3FxY2p4dHFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4NTQ5NTgsImV4cCI6MjA5MjQzMDk1OH0.JGMBXk-eh4yidgFA727DZZFoJAVYduhNqhP9tnxFSFM}"
export NEXT_PUBLIC_GOOGLE_LOGIN="${NEXT_PUBLIC_GOOGLE_LOGIN:-1}"
exec "$@"
