FROM lukemathwalker/cargo-chef:latest-rust-1 AS chef

LABEL org.opencontainers.image.authors "Warren Snipes <contact@warrensnipes.dev>"
LABEL org.opencontainers.image.title "FindMyProfessors API"
LABEL org.opencontainers.image.description "A REST API service written in Rust for FindMyProfessors"
LABEL org.opencontainers.image.url "https://github.com/FindMyProfessors/findmyprofessors/tree/main/api/"
LABEL org.opencontainers.image.source "https://github.com/FindMyProfessors/findmyprofessors/"

FROM chef AS planner
WORKDIR /planner
COPY . .
RUN cargo chef prepare --recipe-path recipe.json

FROM chef AS builder 
WORKDIR /usr/src/

RUN apt-get update && apt-get upgrade -y && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY --from=planner /planner/recipe.json recipe.json
# Build dependencies - this is the caching Docker layer!
RUN cargo chef cook --release --recipe-path recipe.json
# Build application
COPY . .
RUN cargo build --release

FROM gcr.io/distroless/cc-debian12
WORKDIR /usr/app/
COPY --from=builder /usr/src/config /usr/app/config
COPY --from=builder /usr/src/target/release/findmyprofessors_api-cli /usr/app/findmyprofessors_api-cli

CMD ["/usr/app/findmyprofessors_api-cli", "start", "--server-and-worker"]

